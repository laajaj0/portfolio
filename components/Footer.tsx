import React from 'react';
import { useData } from '../context/DataContext';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { personalInfo, t } = useData();

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 mb-6 font-medium">
          {t('footer_rights')} {new Date().getFullYear()} {personalInfo.name}
        </p>
        <div className="flex items-center justify-center gap-6">
           <a href={personalInfo.github} className="text-gray-400 hover:text-black transition-colors">
             <Github size={20} />
           </a>
           <a href={personalInfo.linkedin} className="text-gray-400 hover:text-black transition-colors">
             <Linkedin size={20} />
           </a>
           <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-black transition-colors">
             <Mail size={20} />
           </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;