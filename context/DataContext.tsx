
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  PERSONAL_INFO_EN, PROJECTS_EN, EXPERIENCES_EN, EDUCATION_EN, SKILL_CATEGORIES_EN,
  PERSONAL_INFO_FR, PROJECTS_FR, EXPERIENCES_FR, EDUCATION_FR, SKILL_CATEGORIES_FR,
  TRANSLATIONS
} from '../constants';
import { Project, Experience, Education, SkillCategory, PersonalInfo, Language } from '../types';
import {
  getExperiences, getEducation, getPersonalInfo, getProjects, getSkills,
  saveAllExperiences, saveAllEducation, savePersonalInfo, saveAllProjects, saveAllSkills
} from '../lib/api';

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

// Helper function to merge personal info, preferring database values over defaults
const mergePersonalInfo = (dbInfo: PersonalInfo | null, defaults: PersonalInfo): PersonalInfo => {
  if (!dbInfo) return defaults;

  // Field-by-field merge: use database value if present, otherwise use default
  return {
    name: dbInfo.name ?? defaults.name,
    role: dbInfo.role ?? defaults.role,
    title: dbInfo.title ?? defaults.title,
    bio: dbInfo.bio ?? defaults.bio,
    aboutText: dbInfo.aboutText ?? defaults.aboutText,
    email: dbInfo.email ?? defaults.email,
    phone: dbInfo.phone ?? defaults.phone,
    location: dbInfo.location ?? defaults.location,
    linkedin: dbInfo.linkedin ?? defaults.linkedin,
    github: dbInfo.github ?? defaults.github,
    avatarUrl: dbInfo.avatarUrl ?? defaults.avatarUrl,
    techStackIcons: dbInfo.techStackIcons ?? defaults.techStackIcons,
    aboutImage: dbInfo.aboutImage ?? defaults.aboutImage,
    resumeUrl: dbInfo.resumeUrl ?? defaults.resumeUrl
  };
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

  // Fetch data from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all data from Supabase for both languages
        const [
          experiencesEn, educationEn, personalInfoEn, projectsEn, skillsEn,
          experiencesFr, educationFr, personalInfoFr, projectsFr, skillsFr
        ] = await Promise.all([
          getExperiences('en'),
          getEducation('en'),
          getPersonalInfo('en'),
          getProjects('en'),
          getSkills('en'),
          getExperiences('fr'),
          getEducation('fr'),
          getPersonalInfo('fr'),
          getProjects('fr'),
          getSkills('fr')
        ]);

        const defaultsEn = getDefaults('en');
        const defaultsFr = getDefaults('fr');

        // Merge English data (field-by-field to preserve saved values like avatarUrl)
        const mergedEnData: AppData = {
          personalInfo: mergePersonalInfo(personalInfoEn, defaultsEn.personalInfo),
          projects: projectsEn.length > 0 ? projectsEn : defaultsEn.projects,
          experiences: experiencesEn.length > 0 ? experiencesEn : defaultsEn.experiences,
          education: educationEn.length > 0 ? educationEn : defaultsEn.education,
          skills: skillsEn.length > 0 ? skillsEn : defaultsEn.skills
        };
        console.log('[DataContext] Initial EN data merged:', { avatarUrl: mergedEnData.personalInfo.avatarUrl });
        setDataEn(mergedEnData);
        localStorage.setItem(STORAGE_KEY_EN, JSON.stringify(mergedEnData));

        // Merge French data (field-by-field to preserve saved values like avatarUrl)
        const mergedFrData: AppData = {
          personalInfo: mergePersonalInfo(personalInfoFr, defaultsFr.personalInfo),
          projects: projectsFr.length > 0 ? projectsFr : defaultsFr.projects,
          experiences: experiencesFr.length > 0 ? experiencesFr : defaultsFr.experiences,
          education: educationFr.length > 0 ? educationFr : defaultsFr.education,
          skills: skillsFr.length > 0 ? skillsFr : defaultsFr.skills
        };
        console.log('[DataContext] Initial FR data merged:', { avatarUrl: mergedFrData.personalInfo.avatarUrl });
        setDataFr(mergedFrData);
        localStorage.setItem(STORAGE_KEY_FR, JSON.stringify(mergedFrData));
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
        setError('Failed to load data from server. Using local cache.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refs to track latest state for async access
  const dataEnRef = useRef(dataEn);
  const dataFrRef = useRef(dataFr);

  // Update refs when state changes
  useEffect(() => { dataEnRef.current = dataEn; }, [dataEn]);
  useEffect(() => { dataFrRef.current = dataFr; }, [dataFr]);

  // Save to Supabase
  const saveToAPI = useCallback(async (lang: Language, data: AppData) => {
    console.log(`[DataContext] saveToAPI called for ${lang}:`, { avatarUrl: data.personalInfo.avatarUrl });
    // Always save to localStorage first
    const key = lang === 'en' ? STORAGE_KEY_EN : STORAGE_KEY_FR;
    localStorage.setItem(key, JSON.stringify(data));

    setSaveStatus('saving');

    try {
      console.log(`[Supabase] Saving all ${lang} data...`);

      // Save everything to Supabase
      await Promise.all([
        saveAllExperiences(data.experiences, lang),
        saveAllEducation(data.education, lang),
        savePersonalInfo(data.personalInfo, lang),
        saveAllProjects(data.projects, lang),
        saveAllSkills(data.skills, lang)
      ]);

      console.log(`[Supabase] ✅ Save successful for ${lang}`);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error(`[Supabase] ❌ Error saving data to Supabase (${lang}):`, err);
      if (err instanceof Error) {
        console.error('[Supabase] Error message:', err.message);
      }
      setSaveStatus('error');
      setError(`Failed to save data to server: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, []);

  // Manual save function - saves to Supabase when explicitly called
  const saveData = useCallback(async (lang?: Language) => {
    setSaveStatus('saving');

    // Small delay to ensure all React state updates (from setInfoForm etc.) are applied
    await new Promise(resolve => setTimeout(resolve, 200));

    const langsToSave = lang ? [lang] : ['en' as Language, 'fr' as Language];

    try {
      for (const l of langsToSave) {
        // use refs to get the ABSOLUTE LATEST state
        // This fixes the closure issue where saveData sees old state
        const currentData = l === 'en' ? dataEnRef.current : dataFrRef.current;

        console.log(`[Supabase] Triggering save for ${l} using REF data:`, {
          avatarUrl: currentData.personalInfo.avatarUrl,
          timestamp: Date.now()
        });

        await saveToAPI(l, currentData);
      }

      // Wait a bit for Supabase to process
      await new Promise(resolve => setTimeout(resolve, 500));

      // Reload all data from Supabase to ensure UI and local state are perfectly in sync
      console.log('[Supabase] Reloading data after save...');
      const [
        experiencesEn, educationEn, personalInfoEn, projectsEn, skillsEn,
        experiencesFr, educationFr, personalInfoFr, projectsFr, skillsFr
      ] = await Promise.all([
        getExperiences('en'), getEducation('en'), getPersonalInfo('en'), getProjects('en'), getSkills('en'),
        getExperiences('fr'), getEducation('fr'), getPersonalInfo('fr'), getProjects('fr'), getSkills('fr')
      ]);

      const defaultsEn = getDefaults('en');
      const defaultsFr = getDefaults('fr');

      // Update English state ONLY if we saved English (or saved all)
      if (langsToSave.includes('en')) {
        console.log('[DataContext] Post-save EN data from DB:', { avatarUrl: personalInfoEn?.avatarUrl });
        setDataEn(prev => {
          const merged = {
            personalInfo: mergePersonalInfo(personalInfoEn, prev.personalInfo),
            projects: (projectsEn && projectsEn.length > 0) ? projectsEn : prev.projects,
            experiences: experiencesEn,
            education: educationEn,
            skills: (skillsEn && skillsEn.length > 0) ? skillsEn : prev.skills
          };
          console.log('[DataContext] Post-save EN merged result:', { avatarUrl: merged.personalInfo.avatarUrl });
          return merged;
        });
      }

      // Update French state ONLY if we saved French (or saved all)
      if (langsToSave.includes('fr')) {
        console.log('[DataContext] Post-save FR data from DB:', { avatarUrl: personalInfoFr?.avatarUrl });
        setDataFr(prev => {
          const merged = {
            personalInfo: mergePersonalInfo(personalInfoFr, prev.personalInfo),
            projects: (projectsFr && projectsFr.length > 0) ? projectsFr : prev.projects,
            experiences: experiencesFr,
            education: educationFr,
            skills: (skillsFr && skillsFr.length > 0) ? skillsFr : prev.skills
          };
          console.log('[DataContext] Post-save FR merged result:', { avatarUrl: merged.personalInfo.avatarUrl });
          return merged;
        });
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('[Supabase] saveData failed:', err);
      setSaveStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to save data');
      throw err;
    }
  }, [saveToAPI]); // Removed dataEn, dataFr from dependency array as we use refs

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
