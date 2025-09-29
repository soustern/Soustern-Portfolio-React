// import { useState } from 'react'
import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { LanguageProvider } from './components/contexts/LanguageContext';
import Hero from './layouts/Hero';
import SideBar from './layouts/SideBar';

function App() {
  return (
    <>
      <LanguageProvider>
        <Background BackgroundColor='hero-section-gradient font-sans'>
          <header className='fixed w-full py-20 px-10 z-100'>
            <NavBar></NavBar>
          </header>
          <main>
            <Hero></Hero>
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

