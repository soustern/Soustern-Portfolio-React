import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { LanguageProvider } from './components/contexts/LanguageContext';
import Hero from './layouts/Hero';
import SideBar from './layouts/SideBar';
import Projects from './layouts/Projects';

function App() {
  return (
    <>
      <LanguageProvider>
        <Background BackgroundColor='hero-section-gradient font-sans'>
          <header className='fixed w-full py-20 px-10 z-100'>
            <NavBar></NavBar>
          </header>
          <main className='relative h-screen w-screen'>
            <Hero></Hero>
            <Projects></Projects>
            <SideBar></SideBar>
          </main>
          <footer>
          </footer>
        </Background>
      </LanguageProvider>
    </>
  )
}

export default App

