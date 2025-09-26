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
            <section id='hero' className='w-full h-screen flex items-center justify-center py-12 md:py-16 lg:py-24'>
              <div>
                <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold'>Rafael Antoniassi</h1>
                <div>
                  <video src=""></video>
                </div>
              </div>
            </section>
          </main>
          <footer>
          </footer>
        </Background>
      </LanguageProvider>
    </>
  )
}

export default App

