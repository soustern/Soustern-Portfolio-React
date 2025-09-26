// import { useState } from 'react'
import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';
import { LanguageProvider } from './components/contexts/LanguageContext';

function App() {
  return (
    <>
      <LanguageProvider>
        <Background BackgroundColor='bg-[var(--color-bg-primary)]'>
          <header className='fixed w-full py-20 px-10'>
            <NavBar></NavBar>
          </header>
          <main>
          </main>
          <footer>
          </footer>
        </Background>
      </LanguageProvider>
    </>
  )
}

export default App

