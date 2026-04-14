import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, Ruler, ArrowRight, Star, Shield, Heart, MapPin, Zap, CheckCircle2, ChevronDown, Clock, MoveRight, Users } from 'lucide-react';

// Reusable FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left font-bold text-gray-800 hover:text-purple-600 transition-colors">
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-600' : 'text-gray-400'}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pt-4 text-gray-600 leading-relaxed font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full mx-auto relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed top-0 right-0 -z-20 w-[80vw] h-[80vw] bg-purple-100 rounded-full mix-blend-multiply blur-[120px] opacity-40 animate-float translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed top-[40vh] left-0 -z-20 w-[60vw] h-[60vw] bg-pink-100 rounded-full mix-blend-multiply blur-[100px] opacity-40 animate-float-delayed -translate-x-1/3"></div>

      {/* 1. LAYERED HERO SECTION */}
      <section className="relative pt-20 pb-32 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[55%] z-10 text-center lg:text-left space-y-8"
        >
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-purple-200 text-purple-700 font-bold text-sm mx-auto lg:mx-0 shadow-sm shadow-purple-500/10">
            <Sparkles className="w-4 h-4 fill-purple-600" /> AI-Powered Personal Styling
          </div>

          <h2 className="text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.1] text-gray-900">
            Find Your <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 pb-2">
              Signature Style
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-pink-400 opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" /></svg>
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Stop guessing what looks good on you. Upload a photo or enter measurements to receive a completely personalized fashion and beauty blueprint engineered for your exact features.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            {['Face Shape', 'Body Type', 'Skin Tone', 'Occasion'].map((chip, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest shadow-sm">
                + {chip}
              </span>
            ))}
          </div>

          {/* CTA & Trust */}
          <div className="pt-6 flex flex-col items-center lg:items-start gap-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/wizard')}
                className="flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-purple-600 transition-all shadow-xl shadow-gray-900/20 w-full sm:w-auto"
              >
                Get Styled Now <ArrowRight className="w-6 h-6" />
              </motion.button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center bg-white border-2 border-gray-100 text-gray-800 px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all w-full sm:w-auto"
              >
                See Examples
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" className="rounded-full object-cover w-full h-full" alt="user" /></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="rounded-full object-cover w-full h-full" alt="user" /></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="rounded-full object-cover w-full h-full" alt="user" /></div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-xs">+10k</div>
              </div>
              <p>Used by thousands of fashion lovers</p>
            </div>
          </div>
        </motion.div>

        {/* HERO VISUALS: Intensive Stacking */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:w-[45%] relative w-full h-[600px] hidden md:block"
        >
          {/* Main Portrait */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] rounded-[3rem] overflow-hidden shadow-2xl z-20 transition-transform duration-700 hover:scale-105 border-8 border-white">
            <img src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80" alt="Fashion Main" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-bold text-2xl">Modern Bohemian</h3>
              <p className="text-white/80 font-medium text-sm mt-1">Perfect for your skin tone</p>
            </div>
          </div>

          {/* Floating Confidence Score */}
          <div className="absolute top-12 left-0 glass-panel-heavy p-5 rounded-2xl z-30 shadow-xl shadow-purple-900/10 flex items-center gap-4 animate-float">
            <div className="w-14 h-14 rounded-full border-[4px] border-purple-100 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-black text-xl shrink-0">
              98%
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">AI Match Score</p>
              <p className="text-xs text-green-600 font-bold mt-0.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Highly Recommended</p>
            </div>
          </div>

          {/* Floating Attribute Card */}
          <div className="absolute bottom-20 -right-6 glass-panel-heavy p-4 rounded-xl z-30 shadow-xl shadow-pink-900/10 animate-float-delayed flex flex-col gap-3 w-48">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Analysis</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><span className="text-xs font-semibold text-gray-500">Shape</span><span className="text-sm font-bold text-gray-900">Hourglass</span></div>
              <div className="flex justify-between items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><span className="text-xs font-semibold text-gray-500">Tone</span><span className="text-sm font-bold text-gray-900">Warm</span></div>
            </div>
          </div>

          {/* Background Decorators */}
          <div className="absolute top-0 right-10 w-48 h-48 bg-purple-200 rounded-[2rem] rotate-12 -z-10 opacity-60"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-orange-200 rounded-full blur-2xl -z-10 opacity-40"></div>
        </motion.div>
      </section>

      {/* 2. LOGOS / TRUST BANNER */}
      <div className="w-full border-y border-gray-200/60 bg-white/40 py-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-40 grayscale font-black text-xl tracking-widest">
          <span>VOGUE</span>
          <span>ELLE</span>
          <span>GQ</span>
          <span>NYKAA</span>
          <span>MYNTRA</span>
        </div>
      </div>

      {/* 3. HOW IT WORKS (Horizontal Steps) */}
      <section id="how-it-works" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h3 className="text-sm font-bold tracking-widest text-purple-600 uppercase mb-3">The Process</h3>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">How StyleSense Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-0.5 bg-gray-200 -z-10"></div>
          {[
            { step: '01', icon: Camera, title: "Provide Data", desc: "Upload a photo or enter measurements. Your privacy is guaranteed." },
            { step: '02', icon: Zap, title: "AI Analysis", desc: "Our engine maps your body type, face shape, and color profiles." },
            { step: '03', icon: Star, title: "Get Matches", desc: "Instantly receive outfits, makeup, and hair that uniquely flatter you." },
            { step: '04', icon: Heart, title: "Style Confidently", desc: "Shop and style your daily looks backed by mathematical harmony." }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white border-4 border-gray-50 shadow-xl flex items-center justify-center relative mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-sm">{item.step}</span>
                <item.icon className="w-10 h-10 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed px-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHAT WE PERSONALIZE (Bento Grid) */}
      <section id="features" className="py-32 bg-gray-50 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h3 className="text-sm font-bold tracking-widest text-pink-500 uppercase mb-3">Comprehensive Styling</h3>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Your Complete Look,<br />Analyzed.</h2>
            </div>
            <p className="text-lg text-gray-500 font-medium max-w-sm pb-2">We don't just stop at clothes. We build your entire aesthetic from head to toe.</p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Outfits Card (Spans 2 cols) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-purple-100 to-purple-50 group border border-purple-200 max-h-[300px]">
              <div className="absolute right-0 top-0 w-1/2 h-full -mr-10 -mt-10 overflow-hidden rounded-full mix-blend-multiply opacity-50 group-hover:scale-105 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" alt="Outfits" className="object-cover w-full h-full" />
              </div>
              <div className="relative z-10 w-1/2">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 mb-6 shadow-sm"><Star className="w-6 h-6" /></div>
                <h3 className="text-3xl font-black mb-3">Outfits</h3>
                <p className="text-gray-600 font-medium text-lg leading-relaxed">Perfect cuts and colors that accentuate your natural body shape.</p>
              </div>
            </div>

            {/* Makeup Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-pink-100 to-pink-50 shadow-sm min-h-[300px] flex flex-col justify-between">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm">
                ✨
              </div>

              <div>
                <h3 className="text-2xl font-black mb-2">Makeup</h3>
                <p className="text-gray-600 font-medium">
                  Shades mapped to your exact skin undertone.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] h-[140px]">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80"
                  alt="Makeup"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Hairstyles Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-orange-100 to-orange-50 shadow-sm min-h-[300px] flex flex-col justify-between">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                📸
              </div>

              <div>
                <h3 className="text-2xl font-black mb-2">Hairstyles</h3>
                <p className="text-gray-600 font-medium">
                  Cuts that perfectly balance your face shape.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] h-[140px]">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                  alt="Hairstyle"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Footwear & Specs (Spans 2 cols) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] p-10 bg-gray-900 group max-h-[300px] text-white flex gap-6 items-center">
              <div className="w-1/2 space-y-4">
                <h3 className="text-3xl font-black">Footwear & Specs</h3>
                <p className="text-gray-400 font-medium text-lg">The details matter. We match frame shapes to your jawline, and footwear to balance your proportions.</p>
              </div>
              <div className="w-1/2 grid grid-cols-2 gap-4 h-full">
                <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" alt="shoes" className="w-full h-full object-cover rounded-2xl opacity-80" />
                <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" alt="specs" className="w-full h-full object-cover rounded-2xl opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGIONS & OCCASIONS */}
      <section id="occasions" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h3 className="text-sm font-bold tracking-widest text-orange-500 uppercase">Context Aware</h3>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Styled For Your Life & Culture.</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Fashion isn't one-size-fits-all. StyleSense adapts recommendations based on your occasion and regional preferences, whether that's a corporate office in New York or a vibrant festive wedding in South India.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-6">
              {[
                { label: 'Casual & Daily', val: 'Western' },
                { label: 'Festive Wear', val: 'South Indian' },
                { label: 'Office Professional', val: 'Global' },
                { label: 'Wedding Guest', val: 'North Indian' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col border-l-4 border-purple-200 pl-4 py-1 hover:border-purple-600 transition-colors">
                  <span className="font-bold text-gray-900">{item.label}</span>
                  <span className="text-sm font-medium text-gray-500">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-5 h-[620px]">
            {/* Left Tall Image */}
            <div className="overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                alt="Fashion look"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Right Side */}
            <div className="grid grid-rows-2 gap-5 h-full">
              {/* Top Image */}
              <div className="overflow-hidden rounded-[2rem] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                  alt="Styled outfit"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Bottom Styled Card */}
              {/* Bottom Styled Image Card */}
              <div className="overflow-hidden rounded-[2rem] shadow-xl relative group h-full">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
                  alt="Fashion styling"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY USERS LOVE IT / BENEFITS */}
      <section className="py-24 bg-purple-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-600 rounded-full blur-[150px] opacity-30 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-12">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Stop Wasting Money on Clothes That Don't Fit.</h2>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-2xl"><Clock className="w-6 h-6 text-pink-300" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Save Hours of Shopping</h4>
                  <p className="text-purple-200 font-medium">Know exactly what cuts and colors to look for before you buy.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-2xl"><Shield className="w-6 h-6 text-pink-300" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Boost Your Confidence</h4>
                  <p className="text-purple-200 font-medium">When clothes fit your exact proportions, you naturally feel better.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-white/10 p-3 rounded-2xl"><Users className="w-6 h-6 text-pink-300" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">100% Inclusive</h4>
                  <p className="text-purple-200 font-medium">Our AI never judges. It only harmonizes clothes to your unique body.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-white/5 backdrop-blur-md rounded-[3rem] p-10 border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 className="w-6 h-6" /></div>
              <div>
                <p className="font-bold">Verified Result</p>
                <p className="text-purple-200 text-sm">"It literally transformed my wardrobe."</p>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="results" className="rounded-2xl w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="py-32 px-6 lg:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Common Questions</h2>
          <p className="text-gray-500 font-medium text-lg">Everything you need to know about the product and billing.</p>
        </div>
        <div className="space-y-2">
          <FAQItem
            question="How accurate is the Image Analysis?"
            answer="Our AI models are trained on millions of data points and achieve ~98% accuracy for basic body and face shape estimations when given a clear, front-facing photo in good lighting."
          />
          <FAQItem
            question="Is my uploaded photo saved?"
            answer="No. Your privacy is paramount. Images are processed directly in memory for analysis and immediately discarded. We do not store or use your photos for training."
          />
          <FAQItem
            question="Can I use manual measurements instead?"
            answer="Yes! If you prefer not to upload a photo, you can enter your bust, waist, hips, boundaries, and height manually in Step 2 of the Wizard for precise mathematical recommendations."
          />
          <FAQItem
            question="Does it cater to different regions and cultures?"
            answer="Absolutely. StyleSense incorporates region-specific styling rules. If you select 'South Indian', the recommendations will automatically adapt to sarees, kurtis, and relevant traditional aesthetics."
          />
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-[3rem] bg-gradient-to-br from-gray-900 to-purple-900 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&q=80')] opacity-10 mix-blend-overlay object-cover"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Your Fashion Makeover Awaits.</h2>
            <p className="text-xl text-purple-100 font-medium mb-12">Join thousands of users who have discovered their signature look. It takes less than 2 minutes.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/wizard')}
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Styled Free <MoveRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
