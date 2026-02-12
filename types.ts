
export type Language = 'en' | 'fr';

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string; // Store icon name as string (e.g., "Layout")
  skills: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  screenshots?: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  title: string;
  bio: string; // Used in Hero
  aboutText: string; // New field for About section
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  avatarUrl?: string; // Hero avatar image URL
  techStackIcons?: string[]; // Tech stack icon URLs for Hero section
  aboutImage?: string; // About section photo URL or base64
  resumeUrl?: string; // Resume/CV file URL or base64
}
