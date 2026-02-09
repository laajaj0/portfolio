import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Timeline from './Timeline';
import Contact from './Contact';
import Footer from './Footer';
import Skills from './Skills';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a hash or state to scroll to
    // Use safe type casting
    const state = location.state as { scrollTo?: string } | null;
    
    if (state?.scrollTo) {
      const targetId = state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    } else if (location.hash) {
       const element = document.getElementById(location.hash.substring(1));
       if (element) {
         setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
       }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;