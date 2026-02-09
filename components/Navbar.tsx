import React, { useState } from 'react';
import { Github, Linkedin, Menu, X, Globe, User } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useData } from '../context/DataContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { personalInfo, language, toggleLanguage, t, isAuthenticated } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('#')) {
      const targetId = href.replace('#', '');
      
      if (location.pathname !== '/') {
        // If not on home page, navigate to home then scroll
        navigate('/', { state: { scrollTo: targetId } });
      } else {
        // If on home page, just scroll
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
       navigate(href);
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-[#1C1C1C] text-white rounded-full pl-6 pr-2 py-2 flex items-center shadow-2xl max-w-3xl w-full justify-between">
          
          {/* Logo */}
          <a href="/#hero" onClick={(e) => handleNavClick(e, '#hero')} className="font-bold text-xl tracking-tight mr-8 flex items-center gap-2">
            <span className="bg-white text-black w-8 h-8 flex items-center justify-center rounded-full text-sm font-black">
               {personalInfo.name.charAt(0)}
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {t(item.label)}
              </a>
            ))}
          </div>

          {/* Right Side: Socials & CTA */}
          <div className="flex items-center gap-3 ml-auto md:ml-8">
            <div className="hidden md:flex items-center gap-3 border-r border-gray-700 pr-4 mr-1">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
            
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
            >
              {t('nav_contact')}
            </a>

            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-full transition-colors ml-1"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>

            {/* Admin Link (Hidden on mobile usually, but good for access) */}
            {isAuthenticated && (
                <button onClick={() => navigate('/admin/dashboard')} className="p-2 text-green-400 hover:text-green-300">
                    <User size={18} />
                </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden ml-2 text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center space-y-8 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-2xl font-bold text-white hover:text-gray-300"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {t(item.label)}
            </a>
          ))}
          <button onClick={toggleLanguage} className="text-xl font-bold text-white flex items-center gap-2 border border-white/20 px-6 py-2 rounded-full">
             <Globe size={20} /> Switch to {language === 'en' ? 'French' : 'English'}
          </button>
          <div className="flex gap-6 mt-8">
            <a href={personalInfo.github} className="text-white"><Github size={28} /></a>
            <a href={personalInfo.linkedin} className="text-white"><Linkedin size={28} /></a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;