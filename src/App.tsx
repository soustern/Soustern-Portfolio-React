// import { useState } from 'react'
import './App.css'
import NavBar from './layouts/NavBar'
import Background from './layouts/Background';

function App() {
  // const [count, setCount] = useState(0);
  // const strings: Array<string> = ['one', 'two', 'three'];

  return (
    <>
      <Background BackgroundColor='bg-[var(--color-bg-primary)]'>
        <header className='fixed w-full py-20 px-10'>
          <NavBar></NavBar>
        </header>
        <main>
        </main>
        <footer>
        </footer>
      </Background>
    </>
  )
}

export default App
