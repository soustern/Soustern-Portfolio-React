import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import Hero from './layouts/Hero';
import Projects from './layouts/Projects';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScroll } from './components/contexts/ScrollContext';

function App() {
  const {scrollProgress, handleWheel, pageNumber} = useScroll();

  useEffect(() => {
    window.addEventListener(`wheel`, handleWheel, {passive: false});
    console.log(scrollProgress);
    return () => window.removeEventListener(`wheel`, handleWheel);
  }, [handleWheel, scrollProgress]);

  // useGSAP(() => {
  //   if (!hero.current || !projects.current) return;

  //   gsap.to(hero.current, { opacity: 1 - scrollProgress, duration: 0.3 });
  //   gsap.to(projects.current, { opacity: scrollProgress, duration: 0.3 });
  // }, [scrollProgress]);

  // useGSAP(() => {
  //   window.addEventListener('wheel', handleWheel, { passive: false });
  //   return () => window.removeEventListener('wheel', handleWheel);
  // });

  return (
    <Background BackgroundColor='hero-section-gradient font-sans'>
      <header className='fixed top-0 left-0 w-full py-15 px-10 z-50'>
        <NavBar />
      </header>
      
      <main className='fixed inset-0 overflow-hidden z-5'>
        <Hero />
        <Projects />
      </main>

      <footer className='fixed bottom-0 left-0 w-full' />
    </Background>
  )
}

export default App