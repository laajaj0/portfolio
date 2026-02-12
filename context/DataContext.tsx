
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  PERSONAL_INFO_EN, PROJECTS_EN, EXPERIENCES_EN, EDUCATION_EN, SKILL_CATEGORIES_EN,
  PERSONAL_INFO_FR, PROJECTS_FR, EXPERIENCES_FR, EDUCATION_FR, SKILL_CATEGORIES_FR,
  TRANSLATIONS
} from '../constants';
import { Project, Experience, Education, SkillCategory, PersonalInfo, Language } from '../types';

const ADMIN_HASH = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
const STORAGE_KEY_EN = 'portfolio_data_en';
const STORAGE_KEY_FR = 'portfolio_data_fr';

interface AppData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
}

interface DataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
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
  updateEducation: (edu: Education[], lang?: Language) => void;
  updateSkills: (skills: SkillCategory[], lang?: Language) => void;
  getRawData: (lang: Language) => AppData;
  saveData: (lang?: Language) => Promise<void>; // Manual save function
  loading: boolean;
  error: string | null;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const DataContext = createContext<DataContextType | null>(null);

const getDefaults = (lang: Language): AppData => {
  return lang === 'en'
    ? { personalInfo: PERSONAL_INFO_EN, projects: PROJECTS_EN, experiences: EXPERIENCES_EN, education: EDUCATION_EN, skills: SKILL_CATEGORIES_EN }
    : { personalInfo: PERSONAL_INFO_FR, projects: PROJECTS_FR, experiences: EXPERIENCES_FR, education: EDUCATION_FR, skills: SKILL_CATEGORIES_FR };
};

const getInitialData = (lang: Language): AppData => {
  const key = lang === 'en' ? STORAGE_KEY_EN : STORAGE_KEY_FR;
  const defaults = getDefaults(lang);

  // Try localStorage first (for offline support)
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      const parsedData = JSON.parse(saved);
      return {
        personalInfo: { ...defaults.personalInfo, ...parsedData.personalInfo },
        projects: parsedData.projects || defaults.projects,
        experiences: parsedData.experiences || defaults.experiences,
        education: parsedData.education || defaults.education,
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
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const [dataEn, setDataEn] = useState<AppData>(() => getInitialData('en'));
  const [dataFr, setDataFr] = useState<AppData>(() => getInitialData('fr'));

  const saveTimeoutEn = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimeoutFr = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch both languages
        const [enResponse, frResponse] = await Promise.all([
          fetch('/api/portfolio?lang=en'),
          fetch('/api/portfolio?lang=fr')
        ]);

        if (enResponse.ok) {
          const enData = await enResponse.json();
          const defaultsEn = getDefaults('en');
          // Merge with defaults to ensure all fields exist
          const mergedEnData = {
            personalInfo: { ...defaultsEn.personalInfo, ...enData.personalInfo },
            projects: enData.projects || defaultsEn.projects,
            experiences: enData.experiences || defaultsEn.experiences,
            education: enData.education || defaultsEn.education,
            skills: enData.skills || defaultsEn.skills
          };
          setDataEn(mergedEnData);
          localStorage.setItem(STORAGE_KEY_EN, JSON.stringify(mergedEnData));
        } else if (enResponse.status !== 404) {
          console.warn('Failed to fetch EN data:', await enResponse.text());
        }

        if (frResponse.ok) {
          const frData = await frResponse.json();
          const defaultsFr = getDefaults('fr');
          // Merge with defaults to ensure all fields exist
          const mergedFrData = {
            personalInfo: { ...defaultsFr.personalInfo, ...frData.personalInfo },
            projects: frData.projects || defaultsFr.projects,
            experiences: frData.experiences || defaultsFr.experiences,
            education: frData.education || defaultsFr.education,
            skills: frData.skills || defaultsFr.skills
          };
          setDataFr(mergedFrData);
          localStorage.setItem(STORAGE_KEY_FR, JSON.stringify(mergedFrData));
        } else if (frResponse.status !== 404) {
          console.warn('Failed to fetch FR data:', await frResponse.text());
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data from server. Using local cache.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debounced save to API
  const saveToAPI = useCallback(async (lang: Language, data: AppData) => {
    // Always save to localStorage first
    const key = lang === 'en' ? STORAGE_KEY_EN : STORAGE_KEY_FR;
    localStorage.setItem(key, JSON.stringify(data));

    // Skip API calls in local development (localhost)
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      console.log('Local development: Skipping API save, using localStorage only');
      return;
    }

    if (!isAuthenticated || !password) {
      console.warn('Not authenticated, skipping API save');
      return;
    }

    setSaveStatus('saving');

    try {
      const response = await fetch('/api/portfolio?lang=' + lang, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          data
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving data:', err);
      setSaveStatus('error');
      setError('Failed to save data to server');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [isAuthenticated, password]);

  // Manual save function - only saves when explicitly called
  const saveData = useCallback(async (lang?: Language) => {
    // Small delay to ensure all React state updates are applied
    await new Promise(resolve => setTimeout(resolve, 100));

    const langsToSave = lang ? [lang] : ['en' as Language, 'fr' as Language];

    for (const l of langsToSave) {
      const data = l === 'en' ? dataEn : dataFr;
      console.log(`Saving ${l} data:`, data);
      await saveToAPI(l, data);
    }
  }, [dataEn, dataFr, saveToAPI]);

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
        setPassword(p); // Store password for API calls
        return true;
      }
    } catch (error) {
      console.error("Crypto error:", error);
      return false;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

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
  const updateEducation = (edu: Education[], lang: Language = language) => updateData(lang, 'education', edu);
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
      updateEducation,
      updateSkills,
      getRawData,
      saveData,
      loading,
      error,
      saveStatus
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
