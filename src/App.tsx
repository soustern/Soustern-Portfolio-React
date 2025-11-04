import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { lazy, Suspense, useEffect, useState} from 'react';
import { useScroll } from './components/contexts/ScrollContext';
import ProjectScreen from './layouts/ProjectScreen';

// TODO: Lazy load other sections
const Hero = lazy(() => import('./layouts/Hero'));
const Projects = lazy(() => import('./layouts/Projects'));

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[var(--color-accent-primary)]"></div>
    </div>
  );
};

function App() {
  const {scrollProgress, handleWheel} = useScroll();
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
            await document.fonts.ready.then(() => setFontsReady(true));
    }

    loadFonts();
  }, [])

  useEffect(() => {
    window.addEventListener(`wheel`, handleWheel, {passive: false});
    console.log(scrollProgress);
    return () => window.removeEventListener(`wheel`, handleWheel);
  }, [handleWheel, scrollProgress]);

  return (
    <Background BackgroundColor='hero-section-gradient font-sans'>
      <header className='fixed top-0 left-0 w-full xl:pt-[clamp(1.5rem,10vw,2.5rem)] z-50'>
        <NavBar />
      </header>
      <ProjectScreen fontsReady={fontsReady}/>
      <main className='fixed inset-0 overflow-hidden z-5'>
        <Suspense fallback={LoadingSpinner()}>
          <Hero />
          <Projects />
        </Suspense>
      </main>

      <footer className='fixed bottom-0 left-0 w-full' />
    </Background>
  )
}

export default App