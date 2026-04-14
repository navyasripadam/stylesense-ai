import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Ruler, ArrowRight, ArrowLeft, UploadCloud, Info, Sparkles, X, Check, Eye } from 'lucide-react';

const Wizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [inputMethod, setInputMethod] = useState(''); // 'image' or 'manual'
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [measurements, setMeasurements] = useState({
    bust: '', waist: '', hips: '', shoulders: '', height: ''
  });

  const [details, setDetails] = useState({
    age: '',
    hairLength: '',
    region: 'Western',
    occasion: 'Casual',
    gender: '',
    stylePreference: '',
    needsSpectacles: false,
    needsHaircut: false
  });

  const [showMeasureGuide, setShowMeasureGuide] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image (JPG, PNG, WEBP).");
      return;
    }

    setError(null);
    setImageFile(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('inputMethod', inputMethod);
      formData.append('age', details.age);
      formData.append('hairLength', details.hairLength);
      formData.append('region', details.region);
      formData.append('occasion', details.occasion);
      formData.append('gender', details.gender);
      formData.append('stylePreference', details.stylePreference);
      formData.append('needsSpectacles', details.needsSpectacles);
      formData.append('needsHaircut', details.needsHaircut);

      if (inputMethod === 'image' && imageFile) {
        formData.append('image', imageFile, imageFile.name);
      } else if (inputMethod === 'manual') {
        Object.keys(measurements).forEach(k => {
          formData.append(k, measurements[k]);
        });
      }

      const response = await fetch('https://stylesense-backend-zqim.onrender.comapi/recommend', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      navigate('/results', { state: { data } });
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0, transition: { duration: 0.3 } })
  };

  const stepsList = [
    { id: 1, name: 'Method' },
    { id: 2, name: 'Input Data' },
    { id: 3, name: 'Preferences' }
  ];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full blur-[100px] opacity-50 animate-pulse-soft"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-purple-600 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-purple-600 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black mt-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Designing your style...
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Analyzing features and cross-referencing trends.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center py-10 px-4 max-w-5xl mx-auto w-full relative">
      {/* Dynamic Stepper */}
      <div className="w-full mb-12 flex items-center justify-center">
        <div className="flex items-center w-full max-w-2xl justify-between relative px-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>

          {stepsList.map((s) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 relative bg-white/50 backdrop-blur-sm px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm
                  ${isActive ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white scale-110 shadow-purple-500/30' :
                    isCompleted ? 'bg-purple-100 text-purple-600' : 'bg-white text-gray-400 border border-gray-200'}
                `}>
                  {isCompleted ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span className={`text-xs font-semibold tracking-wide uppercase transition-colors ${isActive ? 'text-gray-900' : isCompleted ? 'text-purple-600' : 'text-gray-400'}`}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" custom={1}>
        {/* STEP 1: Method */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            className="w-full space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black text-gray-900">Choose your input method</h2>
              <p className="text-gray-500 font-medium">How would you like our AI to analyze your profile?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
              <button
                onClick={() => { setInputMethod('image'); handleNext(); }}
                className="glass-panel-heavy p-10 flex flex-col items-center gap-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 transition-all group rounded-3xl border border-gray-100"
              >
                <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-500 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-purple-500/40">
                  <Camera className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Use a Photo</h3>
                  <p className="text-gray-500 text-sm leading-relaxed px-4">Upload a clear, front-facing image. Our AI will automatically detect your face shape, body type, and skin tone.</p>
                </div>
                <div className="mt-auto px-6 py-2 rounded-full bg-gray-50 text-purple-600 font-semibold text-sm group-hover:bg-purple-50 transition-colors">Select &rarr;</div>
              </button>

              <button
                onClick={() => { setInputMethod('manual'); handleNext(); }}
                className="glass-panel-heavy p-10 flex flex-col items-center gap-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10 transition-all group rounded-3xl border border-gray-100"
              >
                <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-orange-400 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-pink-500/40">
                  <Ruler className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Enter Measurements</h3>
                  <p className="text-gray-500 text-sm leading-relaxed px-4">Input your exact bust, waist, hips, and shoulders for the most mathematically precise recommendations.</p>
                </div>
                <div className="mt-auto px-6 py-2 rounded-full bg-gray-50 text-pink-500 font-semibold text-sm group-hover:bg-pink-50 transition-colors">Select &rarr;</div>
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Input */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            className="w-full max-w-2xl glass-panel-heavy p-8 md:p-12 rounded-[2.5rem]"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900">
                {inputMethod === 'image' ? 'Upload Your Photo' : 'Enter Your Measurements'}
              </h2>
              <p className="text-gray-500 font-medium mt-2">
                {inputMethod === 'image' ? 'For best results, use a well-lit, front-facing photo.' : 'Please provide accurate numbers for a perfect fit.'}
              </p>
            </div>

            {inputMethod === 'image' ? (
              <div className="space-y-6">
                {!imagePreview ? (
                  <label className="border-3 border-dashed border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 rounded-[2rem] flex flex-col items-center justify-center p-16 cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                      <UploadCloud className="w-10 h-10 text-purple-500" />
                    </div>
                    <span className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">Click to browse or drag image</span>
                    <span className="text-sm text-gray-400 font-medium">Supports JPG, PNG, WEBP (Max 10MB)</span>
                    <input type="file" className="hidden" accept="image/jpeg,image/png,image/jpg,image/webp" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group border border-gray-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-80 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                      <button onClick={removeImage} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-lg tooltip-trigger" title="Remove Photo">
                        <X className="w-6 h-6" />
                      </button>
                      <label className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition shadow-lg cursor-pointer tooltip-trigger" title="Change Photo">
                        <Camera className="w-6 h-6" />
                        <input type="file" className="hidden" accept="image/jpeg,image/png,image/jpg,image/webp" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                )}
                {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-lg">{error}</p>}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Ruler className="w-5 h-5" /></div>
                    <p className="text-gray-700 font-medium text-sm">Provide your exact body measurements.</p>
                  </div>
                  <button onClick={() => setShowMeasureGuide(true)} className="flex items-center text-sm font-bold text-purple-600 hover:text-purple-800 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition">
                    <Info className="w-4 h-4 mr-1" /> How to measure?
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Bust', 'Waist', 'Hips', 'Shoulders'].map((field) => (
                    <div key={field} className="relative group">
                      <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase transition-colors group-focus-within:text-purple-600 z-10">{field} (in)</label>
                      <input
                        type="number"
                        min="0"
                        value={measurements[field.toLowerCase()]}
                        onChange={(e) => setMeasurements({ ...measurements, [field.toLowerCase()]: e.target.value })}
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-purple-500 outline-none transition-all text-lg font-semibold text-gray-800 shadow-sm"
                        placeholder={`e.g. ${field === 'Shoulders' ? '15' : '34'}`}
                      />
                    </div>
                  ))}
                  <div className="col-span-1 md:col-span-2 relative group mt-2">
                    <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase transition-colors group-focus-within:text-purple-600 z-10">Height (cm)</label>
                    <input
                      type="number"
                      min="0"
                      value={measurements.height}
                      onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                      className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-purple-500 outline-none transition-all text-lg font-semibold text-gray-800 shadow-sm"
                      placeholder="e.g. 165"
                    />
                  </div>
                </div>

                {/* Measure Guide Modal */}
                {showMeasureGuide && (
                  <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[2rem] max-w-lg w-full soft-shadow relative">
                      <button onClick={() => setShowMeasureGuide(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 bg-gray-100 p-2 rounded-full"><X className="w-5 h-5" /></button>
                      <h3 className="text-2xl font-black mb-6 text-gray-900">How to Measure</h3>
                      <div className="space-y-6">

                        {/* Image */}
                        <div className="flex justify-center">
                          <img
                            src="/measurement.jpeg"
                            alt="Measurement Guide"
                            className="w-full max-w-lg rounded-2xl shadow-lg object-contain"
                          />
                        </div>

                        {/* Instructions */}
                        <div className="text-gray-700 text-sm md:text-base space-y-3">

                          <p><strong>Shoulders:</strong> Measure from one shoulder edge to the other across your back.</p>

                          <p><strong>Bust:</strong> Wrap the measuring tape around the fullest part of your chest, keeping it level.</p>

                          <p><strong>Waist:</strong> Measure around your natural waistline (the narrowest part of your torso).</p>

                          <p><strong>Hips:</strong> Measure around the widest part of your hips.</p>

                          <p><strong>Inside Leg:</strong> Measure from the top of your inner thigh down to your ankle.</p>

                        </div>

                      </div>
                      <button onClick={() => setShowMeasureGuide(false)} className="mt-8 w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">Got it</button>
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
              <button onClick={handleBack} className="flex items-center px-6 py-3 text-gray-500 font-semibold hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={inputMethod === 'image' ? !imageFile : Object.values(measurements).some(v => v === '')}
                className="flex items-center px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-gray-900 transition-all shadow-xl shadow-gray-900/20"
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Details & Preferences */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            className="w-full max-w-2xl glass-panel-heavy p-8 md:p-12 rounded-[2.5rem]"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-gray-900">Refine Your Style</h2>
              <p className="text-gray-500 font-medium mt-2">Add some context to help us nail the perfect look.</p>
            </div>

            <div className="space-y-8">
              {/* Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Age</label>
                  <input
                    type="number"
                    min="1"
                    value={details.age}
                    onChange={e => setDetails({ ...details, age: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none font-semibold text-gray-800 shadow-sm"
                    placeholder="e.g. 25"
                  />
                </div>

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Hair Length</label>
                  <select
                    value={details.hairLength}
                    onChange={e => setDetails({ ...details, hairLength: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none appearance-none font-semibold text-gray-800 shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select length</option>
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Region Context</label>
                  <select
                    value={details.region}
                    onChange={e => setDetails({ ...details, region: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none appearance-none font-semibold text-gray-800 shadow-sm cursor-pointer"
                  >
                    <option value="Western">Western / Global</option>
                    <option value="North India">North Indian</option>
                    <option value="South India">South Indian</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Occasion</label>
                  <select
                    value={details.occasion}
                    onChange={e => setDetails({ ...details, occasion: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none appearance-none font-semibold text-gray-800 shadow-sm cursor-pointer"
                  >
                    <option value="Casual">Casual / Everyday</option>
                    <option value="Office">Office / Professional</option>
                    <option value="Party">Party / Night Out</option>
                    <option value="Wedding">Wedding Guest</option>
                    <option value="Festive">Festive / Traditional</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Gender (Optional)</label>
                  <input
                    type="text"
                    value={details.gender}
                    onChange={e => setDetails({ ...details, gender: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none font-semibold text-gray-800 shadow-sm"
                    placeholder="e.g. Female, Male, Non-binary"
                  />
                </div>

                <div className="relative group">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold tracking-wide text-gray-500 uppercase z-10">Vibe (Optional)</label>
                  <input
                    type="text"
                    value={details.stylePreference}
                    onChange={e => setDetails({ ...details, stylePreference: e.target.value })}
                    className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-purple-500 outline-none font-semibold text-gray-800 shadow-sm"
                    placeholder="e.g. Minimalist, Boho, Edgy"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mt-8">
                <h4 className="text-sm font-bold tracking-wide text-gray-500 uppercase mb-4">Extra Recommendations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setDetails(prev => ({ ...prev, needsSpectacles: !prev.needsSpectacles }))}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all border-2 ${details.needsSpectacles ? 'bg-teal-50 border-teal-500 shadow-md shadow-teal-500/10' : 'bg-white border-transparent shadow-sm'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white transition-colors ${details.needsSpectacles ? 'bg-teal-500' : 'bg-gray-200'}`}>
                      {details.needsSpectacles && <Check className="w-4 h-4" />}
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${details.needsSpectacles ? 'text-teal-900' : 'text-gray-700'}`}>Spectacles</p>
                      <p className="text-xs text-gray-500">Find frames for your face</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setDetails(prev => ({ ...prev, needsHaircut: !prev.needsHaircut }))}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all border-2 ${details.needsHaircut ? 'bg-orange-50 border-orange-500 shadow-md shadow-orange-500/10' : 'bg-white border-transparent shadow-sm'}`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white transition-colors ${details.needsHaircut ? 'bg-orange-500' : 'bg-gray-200'}`}>
                      {details.needsHaircut && <Check className="w-4 h-4" />}
                    </div>
                    <div className="text-left">
                      <p className={`font-bold ${details.needsHaircut ? 'text-orange-900' : 'text-gray-700'}`}>Haircuts</p>
                      <p className="text-xs text-gray-500">Styles that compliment you</p>
                    </div>
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center bg-red-50 py-3 rounded-xl">{error}</p>}
            </div>

            <div className="flex justify-between mt-12 pt-6 border-t border-gray-100">
              <button onClick={handleBack} className="flex items-center px-6 py-3 text-gray-500 font-semibold hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all"
              >
                Generate My Style <Sparkles className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wizard;
