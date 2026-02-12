import React from 'react';
import { Star, Briefcase, GraduationCap } from 'lucide-react';
import { useData } from '../context/DataContext';

const Timeline: React.FC = () => {
  const { experiences, education, t } = useData();

  return (
    <section id="experience" className="py-20 bg-white scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-3xl font-extrabold mb-12 text-gray-900">{t('exp_title')}</h2>

        {/* Work Experience Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-800">{t('work_experience')}</h3>
          </div>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 md:gap-8 items-start border-b border-gray-100 pb-8 last:border-0">
                <span className="text-gray-500 font-medium">{exp.period}</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{exp.role}</h4>
                  <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {exp.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-800">{t('education')}</h3>
          </div>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-4 md:gap-8 items-start border-b border-gray-100 pb-8 last:border-0">
                <span className="text-gray-500 font-medium">{edu.period}</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    {edu.school}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Box */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 relative">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center absolute -top-5 left-8 shadow-sm border border-blue-100">
            <Star className="text-blue-500 w-5 h-5 fill-blue-500" />
          </div>
          <p className="text-blue-900 leading-relaxed font-medium">
            "As a self-taught dev, I've built impactful projects like StartupFounder. I'm actively seeking opportunities to gain hands-on experience, contribute to meaningful products, and grow professionally. If you're looking for someone hungry to learn and build — let's connect."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;