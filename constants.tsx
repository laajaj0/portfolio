
import { SkillCategory, Project, Experience, NavItem, PersonalInfo } from "./types";

// --- TRANSLATIONS FOR STATIC UI ---
export const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_experience: "Experience",
    nav_contact: "Contact",
    hero_greeting: "Hi, I'm",
    hero_download: "Download resume",
    hero_preview: "Preview",
    about_title: "About",
    about_highlight_1: "Experience in mobile and web development",
    about_highlight_2: "Passionate about UI/UX and minimalist design",
    about_highlight_3: "Always keeping up with technology trends",
    projects_title: "Shipped Projects",
    projects_view: "View Project",
    projects_details: "View Details",
    projects_live: "Visit Live Site",
    projects_github: "View on GitHub",
    projects_no_link: "Links are currently not available for this project.",
    exp_title: "Work Experience",
    skills_title: "Technical Skills",
    skills_subtitle: "A complete toolkit to bring your projects to life.",
    contact_title: "Get in touch",
    contact_subtitle: "Whether it's a freelance gig, a collaboration, or a full-time opportunity.",
    contact_name: "Full Name",
    contact_email: "Email Address",
    contact_message: "Your Message",
    contact_send: "Send Message",
    footer_rights: "Copyright©",
  },
  fr: {
    nav_home: "Accueil",
    nav_projects: "Projets",
    nav_skills: "Compétences",
    nav_experience: "Expérience",
    nav_contact: "Contact",
    hero_greeting: "Salut, Je suis",
    hero_download: "Télécharger CV",
    hero_preview: "Aperçu",
    about_title: "À Propos",
    about_highlight_1: "Expérience en développement mobile et web",
    about_highlight_2: "Passionné par l'UI/UX et le design minimaliste",
    about_highlight_3: "Toujours en veille technologique",
    projects_title: "Projets Réalisés",
    projects_view: "Voir Projet",
    projects_details: "Voir Détails",
    projects_live: "Voir le Site",
    projects_github: "Voir sur GitHub",
    projects_no_link: "Les liens ne sont pas disponibles pour ce projet.",
    exp_title: "Expérience Professionnelle",
    skills_title: "Compétences Techniques",
    skills_subtitle: "Une boîte à outils complète pour donner vie à vos projets.",
    contact_title: "Contactez-moi",
    contact_subtitle: "Que ce soit pour une mission freelance, une collaboration ou un poste à temps plein.",
    contact_name: "Nom Complet",
    contact_email: "Adresse Email",
    contact_message: "Votre Message",
    contact_send: "Envoyer",
    footer_rights: "Droits d'auteur©",
  }
};

// --- DATA: ENGLISH ---

export const PERSONAL_INFO_EN: PersonalInfo = {
  name: "CHAFAI Oussama",
  role: "Web & Mobile Developer",
  title: "Web & Mobile Developer",
  bio: "Passionate developer creating Java solutions and AI applications. I love solving complex problems and building performant user interfaces.",
  aboutText: "I'm a passionate developer and AI student based in Morocco. I have a solid background in digital development and am currently pursuing a degree in Artificial Intelligence. My goal is to combine these two worlds to create smart and intuitive applications.",
  email: "contact@example.com",
  phone: "+212675186432",
  location: "Morocco",
  linkedin: "https://www.linkedin.com/in/oussama-chafai-99a81a1a9/",
  github: "https://github.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  techStackIcons: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  ],
  aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  resumeUrl: "/resume.pdf"
};

export const PROJECTS_EN: Project[] = [
  {
    id: 1,
    title: "Notion App Clone",
    description: "An all-in-one collaborative workspace. Real-time document editing, databases, and task management.",
    tags: ["Next.js", "React", "Convex"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop"
    ],
    github: "#",
    link: "#"
  },
  {
    id: 2,
    title: "Halamd AI Stylist",
    description: "Your intelligent fashion companion. AI style analysis and personalized outfit recommendations.",
    tags: ["AI", "Python", "React"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    ],
    github: "#",
    link: "#"
  },
  {
    id: 3,
    title: "StartupFounder",
    description: "A sleek platform for startup founders to showcase their projects and find investors.",
    tags: ["React", "Tailwind", "Node.js"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    link: "#"
  },
  {
    id: 4,
    title: "Job Portal",
    description: "Fully responsive job portal with authentication and dashboards for recruiters.",
    tags: ["MERN Stack", "Redux"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    link: "#"
  }
];

export const EXPERIENCES_EN: Experience[] = [
  {
    id: 1,
    role: "Bachelor in AI",
    company: "University / School",
    period: "2024 - Present",
    description: "Machine Learning & Data Science",
    type: "education"
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 - Present",
    description: "Developing web and mobile solutions for various clients.",
    type: "work"
  },
  {
    id: 3,
    role: "Digital Dev Technician",
    company: "OFPPT",
    period: "2021 - 2023",
    description: "Intensive training in software development.",
    type: "education"
  }
];

export const SKILL_CATEGORIES_EN: SkillCategory[] = [
  {
    title: "Front-end",
    icon: "Layout",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    title: "Back-end",
    icon: "Server",
    skills: ["Php", "Firebase", "MySQL"],
  },
  {
    title: "Mobile",
    icon: "Smartphone",
    skills: ["Android (Java)", "Flutter"],
  },
];


// --- DATA: FRENCH ---

export const PERSONAL_INFO_FR: PersonalInfo = {
  name: "CHAFAI Oussama",
  role: "Développeur Web & Mobile",
  title: "Développeur Web & Mobile",
  bio: "Développeur passionné par la création de solutions Java et l'intelligence artificielle. J'adore résoudre des problèmes complexes et créer des interfaces utilisateur performantes.",
  aboutText: "Je suis un développeur passionné et étudiant en IA basé au Maroc. J'ai une formation solide en développement digital et je poursuis actuellement une licence en Intelligence Artificielle. Mon objectif est de combiner ces deux mondes pour créer des applications intelligentes et intuitives.",
  email: "contact@example.com",
  phone: "+212675186432",
  location: "Maroc",
  linkedin: "https://www.linkedin.com/in/oussama-chafai-99a81a1a9/",
  github: "https://github.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  techStackIcons: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  ],
  aboutImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  resumeUrl: "/resume.pdf"
};

export const PROJECTS_FR: Project[] = [
  {
    id: 1,
    title: "Clone App Notion",
    description: "Un espace de travail collaboratif tout-en-un. Édition de documents en temps réel, bases de données et gestion de tâches.",
    tags: ["Next.js", "React", "Convex"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop"
    ],
    github: "#",
    link: "#"
  },
  {
    id: 2,
    title: "Halamd AI Stylist",
    description: "Votre compagnon de mode intelligent. Analyse de style par IA et recommandations personnalisées de tenues.",
    tags: ["AI", "Python", "React"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
    ],
    github: "#",
    link: "#"
  },
  {
    id: 3,
    title: "StartupFounder",
    description: "Une plateforme élégante pour les fondateurs de startups pour présenter leurs projets et trouver des investisseurs.",
    tags: ["React", "Tailwind", "Node.js"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    link: "#"
  },
  {
    id: 4,
    title: "Portail d'emploi",
    description: "Portail d'emploi entièrement réactif avec authentification et tableaux de bord pour les recruteurs.",
    tags: ["MERN Stack", "Redux"],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    link: "#"
  }
];

export const EXPERIENCES_FR: Experience[] = [
  {
    id: 1,
    role: "Licence en Intelligence Artificielle",
    company: "Université / École",
    period: "2024 - Présent",
    description: "Machine Learning & Data Science",
    type: "education"
  },
  {
    id: 2,
    role: "Développeur Full Stack",
    company: "Freelance",
    period: "2023 - Présent",
    description: "Développement de solutions web et mobiles pour divers clients.",
    type: "work"
  },
  {
    id: 3,
    role: "Technicien Dév. Digital",
    company: "OFPPT",
    period: "2021 - 2023",
    description: "Formation intensive en développement logiciel.",
    type: "education"
  }
];

export const SKILL_CATEGORIES_FR: SkillCategory[] = [
  {
    title: "Front-end",
    icon: "Layout",
    skills: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    title: "Back-end",
    icon: "Server",
    skills: ["Php", "Firebase", "MySQL"],
  },
  {
    title: "Mobile",
    icon: "Smartphone",
    skills: ["Android (Java)", "Flutter"],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "nav_home", href: "#hero" },
  { label: "nav_projects", href: "#projects" },
  { label: "nav_skills", href: "#skills" },
  { label: "nav_experience", href: "#experience" },
];
