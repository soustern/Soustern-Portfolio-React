import { useState } from 'react'
import './App.css'
import NavBar from './layouts/NavBar'

function App() {
  const [count, setCount] = useState(0);
  const strings: Array<string> = ['one', 'two', 'three'];

  return (
    <>
      <header className='fixed w-full py-10 px-40'>
        <NavBar></NavBar>
      </header>
      <main>
      </main>
      <footer>
      </footer>
    </>
  )
}

export default App
