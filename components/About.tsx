import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { personalInfo, t } = useData();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12">{t('about_title')}</h2>

        <div className="grid md:grid-cols-12 gap-12">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-6">
            <p className="text-xl font-medium text-gray-900">
              {personalInfo.bio}
            </p>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
              {personalInfo.aboutText}
            </div>

            <ul className="space-y-3 mt-4 text-gray-700">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                {t('about_highlight_1')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                {t('about_highlight_2')}
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                {t('about_highlight_3')}
              </li>
            </ul>
          </div>

          {/* Image Card */}
          <div className="md:col-span-5">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={personalInfo.aboutImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                  alt="Portrait"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="text-center mt-3">
                <p className="font-medium text-gray-500 text-sm">@{personalInfo.name.split(' ')[0].toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;