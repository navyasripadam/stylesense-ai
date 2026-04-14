const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Correct import for the new standard Gemini API
const { GoogleGenAI } = require("@google/genai");

app.use(cors());
app.use(express.json());

// Set up multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Correct initialization
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Measurement Logic
function calculateBodyShape(bust, waist, hips, shoulders) {
  const b = parseFloat(bust);
  const w = parseFloat(waist);
  const h = parseFloat(hips);
  const s = parseFloat(shoulders);

  if (!b || !w || !h || !s) return "Unknown";

  const bustHipsRatio = b / h;
  const hipsBustRatio = h / b;
  const bustWaistRatio = b / w;
  const hipsWaistRatio = h / w;

  if (bustWaistRatio > 1.25 && hipsWaistRatio > 1.25 && bustHipsRatio >= 0.95 && bustHipsRatio <= 1.05) {
    return "hourglass";
  } else if (hipsBustRatio > 1.05) {
    return "pear";
  } else if (bustHipsRatio > 1.05 || (s / h) > 1.05) {
    return "apple"; // or inverted triangle
  } else {
    return "rectangle";
  }
}

app.post('/api/recommend', upload.single('image'), async (req, res) => {
  try {
    const {
      inputMethod, // 'image' or 'manual'
      age, hairLength,
      bust, waist, hips, shoulders, height,
      region, occasion, gender, stylePreference,
      needsSpectacles, needsHaircut
    } = req.body;

    let systemPrompt = `
      You are a fashion stylist AI assistant for StyleSense AI.
      Responsibilities: 
      1. Analyze the user's body shape, face shape, skin tone, and hair length.
      2. Provide outfit recommendations, makeup suggestions, hairstyles, spectacles, and footwear.

      Rules:
      1. Inclusivity: Never shame body types. Use positive language.
      2. Personalization: Consider region, occasion, user preferences, and age.
      3. Age-Based Styling Logic:
         - Teen (13-19): trendy, casual
         - Young Adult (20-35): modern, stylish
         - Adult (35-55): elegant
         - 55+: comfortable and classy
      4. Hair Logic: Do NOT assume hair length. Use user-provided value.
      5. Products: Recommend real products and include valid shopping links.
      6. Explanation: Always explain "Why this suits the user".
      7. Cultural Awareness:
         - South India -> saree, half saree.
         - North India -> lehenga, salwar.
         - Western -> dresses, jeans.
      
      Respond strictly in JSON format matching this schema:
      {
        "outfits": [{ "title": "...", "description": "...", "whyItSuits": "..." }],
        "makeup": [{ 
          "title": "...", 
          "productType": "...", 
          "whyItSuits": "...",
          "recommendedProducts": [
            {
              "name": "...",
              "brand": "...",
              "priceRange": "...",
              "links": {
                "amazon": "...",
                "nykaa": "...",
                "myntra": "...",
                "flipkart": "..."
              }
            }
          ]
        }],
        "hairstyles": [{ "title": "...", "description": "...", "whyItSuits": "..." }],
        "spectacles": [{ "title": "...", "frameShape": "...", "whyItSuits": "..." }],
        "footwear": [{ "title": "...", "description": "...", "whyItSuits": "..." }],
        "confidenceScore": 95,
        "reasoning": "...",
        "detectedAttributes": {
          "bodyShape": "...",
          "faceShape": "...",
          "skinTone": "...",
          "hairLength": "..."
        }
      }
      Do not include any other markdown or text outside the JSON.
    `;

    let userPrompt = `Context:\nAge: ${age || 'Not specified'}\nHair Length: ${hairLength || 'Not specified'}\nRegion: ${region || 'Not specified'}\nOccasion: ${occasion || 'Not specified'}\nGender: ${gender || 'Not specified'}\nStyle Preference: ${stylePreference || 'Not specified'}\n`;
    if (needsSpectacles === 'true') userPrompt += "User needs spectacles recommendations.\n";
    if (needsHaircut === 'true') userPrompt += "User needs haircut recommendations too.\n";

    let parts = [];

    if (inputMethod === 'image' && req.file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

      console.log("Uploaded file MIME type:", req.file.mimetype);

      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          error: "Invalid image format. Please upload JPG, PNG, or WEBP image."
        });
      }

      userPrompt += "\nAnalyze the uploaded image directly to estimate body shape, face shape, skin tone, and hair length.";

      parts = [
        {
          inlineData: {
            data: req.file.buffer.toString("base64"),
            mimeType: req.file.mimetype
          }
        },
        { text: userPrompt }
      ];
    } else if (inputMethod === 'manual') {
      const calculatedShape = calculateBodyShape(bust, waist, hips, shoulders);
      userPrompt += `\nMeasurements provided.\nBust: ${bust}, Waist: ${waist}, Hips: ${hips}, Shoulders: ${shoulders}, Height: ${height}.\nCalculated Body Shape: ${calculatedShape}.\nPlease assume a generic face shape / skin tone if not provided, or focus recommendations entirely on the body shape. Provide the required JSON response.`;
      parts = [{ text: userPrompt }];
    } else {
      return res.status(400).json({ error: "Invalid input method or missing image/measurements." });
    }

    let result;
    let retries = 3;

    while (retries > 0) {
      try {
        // Correct model usage and API call
        result = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: parts,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json"
          }
        });
        break;
      } catch (error) {
        if (error.status === 503 || error.status === 429) {
          console.log("Retrying... API busy or rate limited");
          await new Promise(res => setTimeout(res, 2000)); // wait 2 sec
          retries--;
        } else {
          throw error;
        }
      }
    }

    if (!result) {
      return res.status(503).json({ error: "Server busy. Try again." });
    }

    // Correct response handling
    console.log("Gemini raw result:", result);

    let text = "";

    if (result && result.response && typeof result.response.text === "function") {
      text = result.response.text();
    } else if (result && result.text) {
      text = result.text;
    } else {
      throw new Error("Invalid response from Gemini API");
    }

    if (!text) {
      throw new Error("No response from Gemini");
    }

    let parsedJson;
    try {
      parsedJson = JSON.parse(text);
    } catch (err) {
      // In case Gemini returns markdown block wrapping json
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedJson = JSON.parse(cleanedText);
    }

    res.json(parsedJson);

  } catch (error) {
    console.error("Error in /api/recommend:", error);
    res.status(500).json({ error: "Failed to generate recommendations." });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
