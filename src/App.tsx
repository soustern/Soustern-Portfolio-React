// import { useState } from 'react'
import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { LanguageProvider } from './components/contexts/LanguageContext';
import Hero from './layouts/Hero';

function App() {
  return (
    <>
      <LanguageProvider>
        <Background BackgroundColor='hero-section-gradient'>
          <header className='fixed w-full py-20 px-10'>
            <NavBar></NavBar>
          </header>
          <main>
            <Hero></Hero>
          </main>
          <footer>
          </footer>
        </Background>
      </LanguageProvider>
    </>
  )
}

export default App

