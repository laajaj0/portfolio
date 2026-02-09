import React, { useState } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Project } from '../types';

const Projects: React.FC = () => {
  const { projects, t } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentSlide(0);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const getProjectImages = (project: Project) => {
    const images = [project.image];
    if (project.screenshots && project.screenshots.length > 0) {
      images.push(...project.screenshots);
    }
    // Remove duplicates just in case
    return Array.from(new Set(images));
  };

  const handleNextSlide = (e: React.MouseEvent, total: number) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % total);
  };

  const handlePrevSlide = (e: React.MouseEvent, total: number) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  };

  return (
    <section id="projects" className="py-20 bg-white scroll-mt-28">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-900">
          {t('projects_title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F9FAFB] rounded-3xl p-6 md:p-8 hover:shadow-lg transition-shadow border border-transparent hover:border-gray-200"
            >
              <div className="bg-gray-200 rounded-2xl overflow-hidden aspect-video mb-6 shadow-sm group relative cursor-pointer" onClick={() => openProject(project)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                   <div className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-4 py-2 rounded-full font-medium text-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {t('projects_details')}
                   </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                 <div className="flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map(tag => (
                       <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">{tag}</span>
                    ))}
                 </div>
                 <button 
                   onClick={() => openProject(project)}
                   className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-5 py-2 rounded-full font-medium text-sm transition-colors"
                 >
                   {t('projects_view')} <ArrowRight size={16} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Close Button */}
               <button 
                  onClick={closeProject}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
               >
                  <X size={20} />
               </button>

               {/* Carousel Section */}
               <div className="relative aspect-video bg-black group shrink-0">
                  <img 
                    src={getProjectImages(selectedProject)[currentSlide]} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-contain"
                  />
                  
                  {getProjectImages(selectedProject).length > 1 && (
                    <>
                      <button 
                        onClick={(e) => handlePrevSlide(e, getProjectImages(selectedProject).length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={(e) => handleNextSlide(e, getProjectImages(selectedProject).length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {getProjectImages(selectedProject).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
               </div>

               {/* Content Section */}
               <div className="p-8">
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.link && selectedProject.link !== '#' && (
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                        >
                            <ExternalLink size={20}/> {t('projects_live')}
                        </a>
                      )}
                      
                      {selectedProject.github && selectedProject.github !== '#' && (
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-6 py-4 bg-[#1C1C1C] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                        >
                            <Github size={20}/> {t('projects_github')}
                        </a>
                      )}

                      {(!selectedProject.link || selectedProject.link === '#') && (!selectedProject.github || selectedProject.github === '#') && (
                        <div className="col-span-2 text-center py-2 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                          {t('projects_no_link')}
                        </div>
                      )}
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;