import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { LanguageProvider } from './components/contexts/LanguageContext';
import Hero from './layouts/Hero';
import SideBar from './layouts/SideBar';
import Projects from './layouts/Projects';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  const hero = useRef<HTMLElement>(null);
  const projects = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    
    setScrollProgress(prev => {
      const delta = e.deltaY > 0 ? 0.05 : -0.05;
      console.log(Math.max(0, Math.min(1, prev + delta)));
      return Math.max(0, Math.min(1, prev + delta));
    });
  };

  useGSAP(() => {
    if (!hero.current || !projects.current) return;

    gsap.to(hero.current, { opacity: 1 - scrollProgress, duration: 0.3 });
    gsap.to(projects.current, { opacity: scrollProgress, duration: 0.3 });
  }, [scrollProgress]);

  useGSAP(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  });

  return (
    <LanguageProvider>
      <Background BackgroundColor='hero-section-gradient font-sans'>
        <header className='fixed top-0 left-0 w-full py-20 px-10 z-50'>
          <NavBar />
        </header>
        
        <main className='fixed inset-0 overflow-hidden z-5'>
          <Hero ref={hero} />
          <Projects ref={projects} />
          <SideBar />
        </main>

        <footer className='fixed bottom-0 left-0 w-full' />
      </Background>
    </LanguageProvider>
  )
}

export default App