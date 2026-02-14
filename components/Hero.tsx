import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X } from 'lucide-react';

const Hero: React.FC = () => {
  const { personalInfo, t } = useData();
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  // Debug logging
  console.log('[Hero] Rendering with avatarUrl:', personalInfo.avatarUrl);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 md:px-6 bg-white relative">
      <div className="max-w-4xl mx-auto text-center z-10">

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-100 p-1 shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-500 rounded-full opacity-10"></div>
            <img
              src={personalInfo.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight"
        >
          {t('hero_greeting')} <span className="text-black">{personalInfo.name}</span>. <br />
          <span className="text-gray-500">{personalInfo.role}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 mb-16 h-20"
        >
          <AnimatePresence mode="wait">
            {!showResumeOptions ? (
              <motion.button
                key="main-button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setShowResumeOptions(true)}
                className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('hero_download')}
              </motion.button>
            ) : (
              <motion.div
                key="options-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white border border-gray-200 p-2 pl-4 pr-2 rounded-full shadow-2xl flex items-center gap-2"
              >
                <span className="text-sm font-semibold text-gray-500 mr-2">Resume:</span>
                <button
                  onClick={() => {
                    if (personalInfo.resumeUrl) {
                      let downloadUrl = personalInfo.resumeUrl;
                      // Convert Google Drive preview/view links to download links
                      if (downloadUrl.includes('drive.google.com')) {
                        const fileIdMatch = downloadUrl.match(/\/d\/([^\/]+)/);
                        if (fileIdMatch) {
                          downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
                        }
                      }
                      // For base64 or regular URLs, create a download link
                      const link = document.createElement('a');
                      link.href = downloadUrl;
                      link.download = 'resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-full font-medium text-sm transition-colors"
                >
                  <Download size={16} /> {t('hero_download')}
                </button>
                <button
                  onClick={() => {
                    if (personalInfo.resumeUrl) {
                      window.open(personalInfo.resumeUrl, '_blank');
                    }
                  }}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  <Eye size={16} /> {t('hero_preview')}
                </button>
                <button
                  onClick={() => setShowResumeOptions(false)}
                  className="ml-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          {(personalInfo.techStackIcons || [
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
          ]).map((iconUrl, index) => (
            <img key={index} src={iconUrl} className="h-10 w-10 md:h-12 md:w-12" alt={`Tech ${index + 1}`} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;