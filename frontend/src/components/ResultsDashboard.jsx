import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2, Star, Target, Sparkles, AlertCircle, Quote } from 'lucide-react';

const RecommendationCard = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-4 mt-8 first:mt-0">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {item.title}
              </h3>
              {(item.productType || item.frameShape) && (
                <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ml-3 shrink-0">
                  {item.productType || item.frameShape}
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {item.description}
              </p>
            )}

            {item.whyItSuits && (
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mt-4">
                <p className="text-xs font-semibold text-purple-600 mb-1">
                  ✨ Why it suits you
                </p>
                <p className="text-sm text-gray-700">
                  {item.whyItSuits}
                </p>
              </div>
            )}

            {item.recommendedProducts && item.recommendedProducts.length > 0 && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <h5 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-gray-500">Recommended Products</h5>
                <div className="space-y-3">
                  {item.recommendedProducts.map((prod, pIdx) => (
                    <div key={pIdx} className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{prod.name}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{prod.brand}</p>
                        </div>
                        {prod.priceRange && (
                          <span className="bg-white text-gray-600 text-[10px] px-2 py-1 rounded font-bold shadow-sm whitespace-nowrap">
                            {prod.priceRange}
                          </span>
                        )}
                      </div>
                      
                      {prod.links && Object.values(prod.links).some(url => url && !url.includes("...")) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {Object.entries(prod.links).map(([store, url]) => {
                            if (!url || url.includes("...")) return null;
                            let bgColor = "bg-gray-800";
                            const sLower = store.toLowerCase();
                            if (sLower === 'amazon') bgColor = "bg-black";
                            if (sLower === 'nykaa') bgColor = "bg-pink-500";
                            if (sLower === 'flipkart') bgColor = "bg-blue-500";
                            if (sLower === 'myntra') bgColor = "bg-fuchsia-600";
                            
                            return (
                              <a key={store} href={url} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs text-white rounded-full ${bgColor} hover:opacity-80 transition-opacity`}>
                                {store.charAt(0).toUpperCase() + store.slice(1)}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black mb-4 text-gray-900">No Profile Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find your style recommendations. Please restart the styling wizard to generate your profile.</p>
        <button onClick={() => navigate('/wizard')} className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">Start Over</button>
      </div>
    );
  }

  const { outfits, makeup, hairstyles, spectacles, footwear, confidenceScore, reasoning, detectedAttributes } = data;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto py-12 px-6 lg:px-12 space-y-16 relative">
      {/* HEADER SECTION */}
      <div className="glass-panel-heavy rounded-[3rem] p-8 md:p-12 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 -z-10"></div>
        
        <button onClick={() => navigate('/wizard')} className="flex items-center text-gray-500 hover:text-gray-900 mb-8 font-semibold transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-max border border-gray-100">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Editor
        </button>
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:items-center">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Your Signature <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">Style Blueprint</span>
            </h2>
            
            <div className="mt-8 flex gap-4 bg-white/70 p-6 rounded-3xl border border-gray-100">
              <Quote className="w-8 h-8 text-purple-300 flex-shrink-0" />
              <p className="text-lg text-gray-700 font-semibold italic leading-relaxed">{reasoning}</p>
            </div>
          </div>
          
          {confidenceScore && (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-full h-48 w-48 shadow-2xl shadow-purple-900/10 border-[8px] border-purple-50 shrink-0 relative">
              <div className="absolute inset-0 rounded-full border border-purple-200"></div>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tighter">
                {confidenceScore}<span className="text-2xl">%</span>
              </div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Match
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ATTRIBUTES OVERVIEW */}
      {detectedAttributes && (
        <section>
          <div className="flex items-center gap-2 mb-6 ml-2">
            <Target className="w-5 h-5 text-gray-400" />
            <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Analyzed Attributes</h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Body Shape', value: detectedAttributes.bodyShape, color: 'purple' },
              { label: 'Face Shape', value: detectedAttributes.faceShape, color: 'pink' },
              { label: 'Skin Tone', value: detectedAttributes.skinTone, color: 'orange' },
              { label: 'Hair Length', value: detectedAttributes.hairLength, color: 'teal' },
            ].map((attr, idx) => (
              attr.value && (
                <div key={idx} className={`bg-${attr.color}-50 rounded-3xl p-6 border border-${attr.color}-100 relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-${attr.color}-100 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className={`text-xs text-${attr.color}-600 font-bold uppercase tracking-wider`}>{attr.label}</div>
                  <div className="text-xl font-black text-gray-900 mt-2 capitalize">{attr.value}</div>
                </div>
              )
            ))}
          </motion.div>
        </section>
      )}

      {/* DETAILED RECOMMENDATIONS - MASONRY/GRID */}
      <section>
        <div className="flex items-center gap-2 mb-8 ml-2">
          <Star className="w-5 h-5 text-purple-500 fill-purple-500" />
          <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Curated For You</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-6">
          <div className="space-y-4">
            <RecommendationCard title="👗 Outfits" items={outfits} />
            <RecommendationCard title="👠 Footwear" items={footwear} />
          </div>
          <div className="space-y-4">
            <RecommendationCard title="💄 Makeup" items={makeup} />
            <RecommendationCard title="💇 Hairstyles" items={hairstyles} />
            <RecommendationCard title="👓 Spectacles" items={spectacles} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultsDashboard;
