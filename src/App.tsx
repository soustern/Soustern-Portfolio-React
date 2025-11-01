import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import Hero from './layouts/Hero';
import Projects from './layouts/Projects';
import { useEffect, useState} from 'react';
import { useScroll } from './components/contexts/ScrollContext';
import ProjectScreen from './layouts/ProjectScreen';

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
      <header className='fixed top-0 left-0 w-full py-15 px-10 z-50'>
        <NavBar />
      </header>
      <ProjectScreen fontsReady={fontsReady}/>
      <main className='fixed inset-0 overflow-hidden z-5'>
        <Hero />
        <Projects />
      </main>

      <footer className='fixed bottom-0 left-0 w-full' />
    </Background>
  )
}

export default App