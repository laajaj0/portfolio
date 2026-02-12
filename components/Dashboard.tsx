import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Plus, Trash2, User, Briefcase, Code2, FolderGit2, X, Globe, Layout, Server, Smartphone, Image, GraduationCap } from 'lucide-react';
import { Project, Experience, Education, Language } from '../types';

// Map for safe dynamic icon rendering
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Layout,
  Server,
  Smartphone,
  Code2
};

const Dashboard: React.FC = () => {
  const {
    getRawData,
    updatePersonalInfo,
    updateProjects,
    updateExperiences,
    updateEducation,
    updateSkills,
    logout,
    saveStatus
  } = useData();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'experience' | 'education' | 'skills' | 'images'>('info');
  const [editingLang, setEditingLang] = useState<Language>('fr');

  // Load data based on selected editing language
  const currentData = getRawData(editingLang);

  // Local state for info form
  const [infoForm, setInfoForm] = useState(currentData.personalInfo);

  // Sync local form when language or data changes
  useEffect(() => {
    setInfoForm(currentData.personalInfo);
  }, [editingLang, currentData.personalInfo]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInfoSave = () => {
    updatePersonalInfo(infoForm, editingLang);
    alert(`Personal Info (${editingLang.toUpperCase()}) Saved!`);
  };

  const handleProjectChange = (id: number, field: keyof Project, value: any) => {
    const updated = currentData.projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    updateProjects(updated, editingLang);
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: 'New Project',
      description: 'Description here...',
      tags: ['React'],
      image: 'https://picsum.photos/800/600',
      screenshots: [],
      github: '',
      link: ''
    };
    updateProjects([...currentData.projects, newProject], editingLang);
  };

  const deleteProject = (id: number) => {
    updateProjects(currentData.projects.filter(p => p.id !== id), editingLang);
  };

  const handleExpChange = (id: number, field: keyof Experience, value: any) => {
    const updated = currentData.experiences.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateExperiences(updated, editingLang);
  };

  const addExp = () => {
    const newExp: Experience = {
      id: Date.now(),
      role: 'New Role',
      company: 'Company',
      period: '2024',
      description: 'Description...'
    };
    updateExperiences([...currentData.experiences, newExp], editingLang);
  };

  const deleteExp = (id: number) => {
    updateExperiences(currentData.experiences.filter(e => e.id !== id), editingLang);
  };

  const handleEducationChange = (id: number, field: keyof Education, value: any) => {
    const updated = currentData.education.map(e => e.id === id ? { ...e, [field]: value } : e);
    updateEducation(updated, editingLang);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now(),
      degree: 'New Degree',
      school: 'School Name',
      period: '2024',
      description: 'Description...'
    };
    updateEducation([...currentData.education, newEdu], editingLang);
  };

  const deleteEducation = (id: number) => {
    updateEducation(currentData.education.filter(e => e.id !== id), editingLang);
  };

  const handleSkillTitleChange = (index: number, newTitle: string) => {
    const updated = currentData.skills.map((cat, i) =>
      i === index ? { ...cat, title: newTitle } : cat
    );
    updateSkills(updated, editingLang);
  };

  const addSkillToCategory = (catIndex: number) => {
    const updated = currentData.skills.map((cat, i) => {
      if (i === catIndex) {
        return { ...cat, skills: [...cat.skills, "New Skill"] };
      }
      return cat;
    });
    updateSkills(updated, editingLang);
  };

  const updateSkillName = (catIndex: number, skillIndex: number, value: string) => {
    const updated = currentData.skills.map((cat, i) => {
      if (i === catIndex) {
        const newSkills = [...cat.skills];
        newSkills[skillIndex] = value;
        return { ...cat, skills: newSkills };
      }
      return cat;
    });
    updateSkills(updated, editingLang);
  };

  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    const updated = currentData.skills.map((cat, i) => {
      if (i === catIndex) {
        return { ...cat, skills: cat.skills.filter((_, skIdx) => skIdx !== skillIndex) };
      }
      return cat;
    });
    updateSkills(updated, editingLang);
  };

  // Helper function to convert uploaded image to base64
  const handleImageUpload = (file: File, callback: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="bg-black text-white w-full md:w-64 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your portfolio</p>
        </div>

        <div className="mb-6 bg-gray-900 rounded-lg p-1 flex">
          <button
            onClick={() => setEditingLang('en')}
            className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${editingLang === 'en' ? 'bg-white text-black' : 'text-gray-400'}`}
          >
            ENGLISH
          </button>
          <button
            onClick={() => setEditingLang('fr')}
            className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${editingLang === 'fr' ? 'bg-white text-black' : 'text-gray-400'}`}
          >
            FRENCH
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('info')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'info' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <User size={18} /> Info
          </button>
          <button onClick={() => setActiveTab('images')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'images' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <Image size={18} /> Images
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'projects' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <FolderGit2 size={18} /> Projects
          </button>
          <button onClick={() => setActiveTab('experience')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'experience' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <Briefcase size={18} /> Experience
          </button>
          <button onClick={() => setActiveTab('education')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'education' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <GraduationCap size={18} /> Education
          </button>
          <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'skills' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
            <Code2 size={18} /> Skills
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 text-gray-400 hover:text-white mb-2">View Site</button>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
            <Globe size={16} /> Editing Content for: <span className="font-bold text-black uppercase">{editingLang === 'en' ? 'English' : 'French'}</span>
          </div>

          {saveStatus !== 'idle' && (
            <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-sm ${saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' :
              saveStatus === 'saved' ? 'bg-green-50 text-green-700' :
                'bg-red-50 text-red-700'
              }`}>
              {saveStatus === 'saving' && (
                <>
                  <div className="w-3 h-3 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Error saving
                </>
              )}
            </div>
          )}
        </div>

        {activeTab === 'info' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><User /> Personal Info ({editingLang.toUpperCase()})</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={infoForm.name || ''} onChange={e => setInfoForm({ ...infoForm, name: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input type="text" value={infoForm.role || ''} onChange={e => setInfoForm({ ...infoForm, role: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Bio</label>
                <textarea rows={3} value={infoForm.bio || ''} onChange={e => setInfoForm({ ...infoForm, bio: e.target.value })} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About Text</label>
                <textarea rows={5} value={infoForm.aboutText || ''} onChange={e => setInfoForm({ ...infoForm, aboutText: e.target.value })} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="text" value={infoForm.email || ''} onChange={e => setInfoForm({ ...infoForm, email: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={infoForm.phone || ''} onChange={e => setInfoForm({ ...infoForm, phone: e.target.value })} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              {/* Resume/CV Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3">Resume / CV</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume URL or File</label>
                  <input
                    type="text"
                    value={infoForm.resumeUrl || ''}
                    onChange={e => setInfoForm({ ...infoForm, resumeUrl: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    placeholder="https://example.com/resume.pdf or /resume.pdf"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">or</span>
                    <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                      Upload PDF
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, (dataUrl) => setInfoForm({ ...infoForm, resumeUrl: dataUrl }));
                        }}
                      />
                    </label>
                    {infoForm.resumeUrl && (
                      <a
                        href={infoForm.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Preview Resume
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Upload a PDF file or paste a URL to your resume</p>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3">Social Links</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={infoForm.linkedin || ''}
                      onChange={e => setInfoForm({ ...infoForm, linkedin: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={infoForm.github || ''}
                      onChange={e => setInfoForm({ ...infoForm, github: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
              </div>
              <button onClick={handleInfoSave} className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Image /> Hero & About Images ({editingLang.toUpperCase()})</h2>
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">Avatar Image (Hero Section)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                    <input
                      type="text"
                      value={infoForm.avatarUrl || ''}
                      onChange={e => setInfoForm({ ...infoForm, avatarUrl: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">or</span>
                      <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                        Upload File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, (dataUrl) => setInfoForm({ ...infoForm, avatarUrl: dataUrl }));
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <div className="w-24 h-24 rounded-full bg-purple-100 p-1 overflow-hidden">
                      <img
                        src={infoForm.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"; }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Image Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-3">About Section Photo</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Photo URL</label>
                    <input
                      type="text"
                      value={infoForm.aboutImage || ''}
                      onChange={e => setInfoForm({ ...infoForm, aboutImage: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                      placeholder="https://example.com/photo.jpg"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">or</span>
                      <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors">
                        Upload File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, (dataUrl) => setInfoForm({ ...infoForm, aboutImage: dataUrl }));
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                    <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={infoForm.aboutImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                        alt="About Photo Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack Icons Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Tech Stack Icons</h3>
                  <button
                    onClick={() => setInfoForm({ ...infoForm, techStackIcons: [...(infoForm.techStackIcons || []), ''] })}
                    className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    <Plus size={16} /> Add Icon
                  </button>
                </div>
                <div className="space-y-3">
                  {(infoForm.techStackIcons || []).map((iconUrl, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <div className="w-12 h-12 bg-white rounded flex items-center justify-center flex-shrink-0">
                        <img
                          src={iconUrl || 'https://via.placeholder.com/48'}
                          alt={`Icon ${index + 1}`}
                          className="w-10 h-10 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48'; }}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={iconUrl}
                          onChange={e => {
                            const updated = [...(infoForm.techStackIcons || [])];
                            updated[index] = e.target.value;
                            setInfoForm({ ...infoForm, techStackIcons: updated });
                          }}
                          className="w-full p-2 border rounded-lg text-sm"
                          placeholder="https://example.com/icon.svg"
                        />
                        <label className="cursor-pointer text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-block transition-colors">
                          Upload Icon
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, (dataUrl) => {
                                  const updated = [...(infoForm.techStackIcons || [])];
                                  updated[index] = dataUrl;
                                  setInfoForm({ ...infoForm, techStackIcons: updated });
                                });
                              }
                            }}
                          />
                        </label>
                      </div>
                      <button
                        onClick={() => {
                          const updated = (infoForm.techStackIcons || []).filter((_, i) => i !== index);
                          setInfoForm({ ...infoForm, techStackIcons: updated });
                        }}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {(!infoForm.techStackIcons || infoForm.techStackIcons.length === 0) && (
                    <p className="text-gray-500 text-sm text-center py-4">No tech stack icons added yet. Click "Add Icon" to get started.</p>
                  )}
                </div>
              </div>

              <button onClick={handleInfoSave} className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-4">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><FolderGit2 /> Projects ({editingLang.toUpperCase()})</h2>
              <button onClick={addProject} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} /> Add Project
              </button>
            </div>
            <div className="space-y-6">
              {currentData.projects.map(project => (
                <div key={project.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Cover Image URL</label>
                      <input type="text" value={project.image || ''} onChange={e => handleProjectChange(project.id, 'image', e.target.value)} className="w-full p-2 border rounded-lg text-sm mb-2" />
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={project.image} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:col-span-8 space-y-3">
                      <input type="text" value={project.title || ''} onChange={e => handleProjectChange(project.id, 'title', e.target.value)} className="w-full p-2 border rounded-lg font-bold" placeholder="Project Title" />
                      <textarea rows={2} value={project.description || ''} onChange={e => handleProjectChange(project.id, 'description', e.target.value)} className="w-full p-2 border rounded-lg text-sm" placeholder="Description" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={project.github || ''} onChange={e => handleProjectChange(project.id, 'github', e.target.value)} className="w-full p-2 border rounded-lg text-sm" placeholder="Github URL" />
                        <input type="text" value={project.link || ''} onChange={e => handleProjectChange(project.id, 'link', e.target.value)} className="w-full p-2 border rounded-lg text-sm" placeholder="Live URL" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Screenshots (Comma separated URLs)</label>
                        <textarea
                          rows={2}
                          value={project.screenshots?.join('\n') || ''}
                          onChange={e => handleProjectChange(project.id, 'screenshots', e.target.value.split('\n').map(s => s.trim()).filter(s => s !== ''))}
                          className="w-full p-2 border rounded-lg text-sm"
                          placeholder="https://example.com/shot1.jpg&#10;https://example.com/shot2.jpg"
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <button onClick={() => deleteProject(project.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"><Trash2 size={16} /> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase /> Work Experience ({editingLang.toUpperCase()})</h2>
              <button onClick={addExp} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} /> Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {currentData.experiences.map(exp => (
                <div key={exp.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <input type="text" value={exp.role || ''} onChange={e => handleExpChange(exp.id, 'role', e.target.value)} className="w-full p-2 border rounded-lg font-bold" placeholder="Role" />
                    <input type="text" value={exp.company || ''} onChange={e => handleExpChange(exp.id, 'company', e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Company" />
                  </div>
                  <input type="text" value={exp.period || ''} onChange={e => handleExpChange(exp.id, 'period', e.target.value)} className="w-full p-2 border rounded-lg text-sm mb-3" placeholder="Period (e.g., 2023 - Present)" />
                  <textarea rows={2} value={exp.description || ''} onChange={e => handleExpChange(exp.id, 'description', e.target.value)} className="w-full p-2 border rounded-lg text-sm" placeholder="Description" />
                  <div className="flex justify-end pt-2">
                    <button onClick={() => deleteExp(exp.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"><Trash2 size={16} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => alert(`Work Experience (${editingLang.toUpperCase()}) Saved!`)}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><GraduationCap /> Education / Formation ({editingLang.toUpperCase()})</h2>
              <button onClick={addEducation} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                <Plus size={16} /> Add Education
              </button>
            </div>
            <div className="space-y-4">
              {currentData.education.map(edu => (
                <div key={edu.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <input type="text" value={edu.degree || ''} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} className="w-full p-2 border rounded-lg font-bold" placeholder="Degree / Diploma" />
                    <input type="text" value={edu.school || ''} onChange={e => handleEducationChange(edu.id, 'school', e.target.value)} className="w-full p-2 border rounded-lg" placeholder="School / University" />
                  </div>
                  <input type="text" value={edu.period || ''} onChange={e => handleEducationChange(edu.id, 'period', e.target.value)} className="w-full p-2 border rounded-lg text-sm mb-3" placeholder="Period (e.g., 2021 - 2023)" />
                  <textarea rows={2} value={edu.description || ''} onChange={e => handleEducationChange(edu.id, 'description', e.target.value)} className="w-full p-2 border rounded-lg text-sm" placeholder="Description" />
                  <div className="flex justify-end pt-2">
                    <button onClick={() => deleteEducation(edu.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"><Trash2 size={16} /> Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => alert(`Education (${editingLang.toUpperCase()}) Saved!`)}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-6"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Code2 /> Skills ({editingLang.toUpperCase()})</h2>
            <div className="grid gap-6">
              {currentData.skills.map((category, catIndex) => {
                // Safe rendering of the icon component from map
                const IconComponent = ICON_MAP[category.icon] || Code2;

                return (
                  <div key={catIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent size={20} className="text-gray-600" />
                      </div>
                      <input
                        type="text"
                        value={category.title || ''}
                        onChange={(e) => handleSkillTitleChange(catIndex, e.target.value)}
                        className="font-bold text-lg p-1 border border-transparent hover:border-gray-200 rounded focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                          <input
                            type="text"
                            value={skill || ''}
                            onChange={(e) => updateSkillName(catIndex, skillIndex, e.target.value)}
                            className="bg-transparent border-none text-sm w-24 focus:w-32 focus:outline-none transition-all"
                          />
                          <button onClick={() => removeSkillFromCategory(catIndex, skillIndex)} className="text-gray-400 hover:text-red-500">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addSkillToCategory(catIndex)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 hover:text-black hover:border-black text-sm transition-colors"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;