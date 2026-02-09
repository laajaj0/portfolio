
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PERSONAL_INFO_EN, PROJECTS_EN, EXPERIENCES_EN, SKILL_CATEGORIES_EN,
  PERSONAL_INFO_FR, PROJECTS_FR, EXPERIENCES_FR, SKILL_CATEGORIES_FR,
  TRANSLATIONS
} from '../constants';
import { Project, Experience, SkillCategory, PersonalInfo, Language } from '../types';

const ADMIN_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
const STORAGE_KEY_EN = 'portfolio_data_en';
const STORAGE_KEY_FR = 'portfolio_data_fr';

interface AppData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
}

interface DataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  skills: SkillCategory[];
  t: (key: string) => string;
  language: Language;
  toggleLanguage: () => void;
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
  updatePersonalInfo: (info: PersonalInfo, lang?: Language) => void;
  updateProjects: (projects: Project[], lang?: Language) => void;
  updateExperiences: (exp: Experience[], lang?: Language) => void;
  updateSkills: (skills: SkillCategory[], lang?: Language) => void;
  getRawData: (lang: Language) => AppData;
}

const DataContext = createContext<DataContextType | null>(null);


const getInitialData = (lang: Language): AppData => {
  const key = lang === 'en' ? STORAGE_KEY_EN : STORAGE_KEY_FR;
  const defaults = lang === 'en'
    ? { personalInfo: PERSONAL_INFO_EN, projects: PROJECTS_EN, experiences: EXPERIENCES_EN, skills: SKILL_CATEGORIES_EN }
    : { personalInfo: PERSONAL_INFO_FR, projects: PROJECTS_FR, experiences: EXPERIENCES_FR, skills: SKILL_CATEGORIES_FR };

  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsedData = JSON.parse(saved);
      // Merge saved data with defaults to ensure new fields are present
      return {
        personalInfo: { ...defaults.personalInfo, ...parsedData.personalInfo },
        projects: parsedData.projects || defaults.projects,
        experiences: parsedData.experiences || defaults.experiences,
        skills: parsedData.skills || defaults.skills
      };
    } catch (e) {
      console.error("Failed to parse saved data", e);
    }
  }
  return defaults;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [dataEn, setDataEn] = useState<AppData>(() => getInitialData('en'));
  const [dataFr, setDataFr] = useState<AppData>(() => getInitialData('fr'));

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EN, JSON.stringify(dataEn));
  }, [dataEn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FR, JSON.stringify(dataFr));
  }, [dataFr]);

  const login = async (u: string, p: string): Promise<boolean> => {
    if (u !== "admin") return false;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(p);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      if (hashHex === ADMIN_HASH) {
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.error("Crypto error:", error);
      return false;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);
  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  const t = (key: string): string => (TRANSLATIONS[language] as any)[key] || key;

  const updateData = (lang: Language, key: keyof AppData, value: any) => {
    if (lang === 'en') {
      setDataEn(prev => ({ ...prev, [key]: value }));
    } else {
      setDataFr(prev => ({ ...prev, [key]: value }));
    }
  };

  const updatePersonalInfo = (info: PersonalInfo, lang: Language = language) => updateData(lang, 'personalInfo', info);
  const updateProjects = (projects: Project[], lang: Language = language) => updateData(lang, 'projects', projects);
  const updateExperiences = (exp: Experience[], lang: Language = language) => updateData(lang, 'experiences', exp);
  const updateSkills = (skills: SkillCategory[], lang: Language = language) => updateData(lang, 'skills', skills);

  const getRawData = (lang: Language) => lang === 'en' ? dataEn : dataFr;
  const currentData = language === 'en' ? dataEn : dataFr;

  return (
    <DataContext.Provider value={{
      ...currentData,
      t,
      language,
      toggleLanguage,
      isAuthenticated,
      login,
      logout,
      updatePersonalInfo,
      updateProjects,
      updateExperiences,
      updateSkills,
      getRawData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
