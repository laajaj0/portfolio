import React from 'react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { Code2, Layout, Server, Smartphone } from 'lucide-react';

// Map for safe dynamic icon rendering
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layout,
  Server,
  Smartphone,
  Code2
};

const Skills: React.FC = () => {
  const { skills, t } = useData();

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('skills_title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t('skills_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, index) => {
            // Get icon from map or fallback
            const Icon = ICON_MAP[category.icon] || Code2;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-black/10 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-black transition-colors">
                  <Icon className="text-black group-hover:text-white group-hover:scale-110 transition-all" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-white text-gray-600 text-sm rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;