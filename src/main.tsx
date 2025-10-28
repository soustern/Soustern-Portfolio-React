import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './components/contexts/LanguageContext.tsx'
import { ScrollProvider } from './components/contexts/ScrollContext.tsx'
import { ProjectProvider } from './components/contexts/ProjectContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProjectProvider>
      <LanguageProvider>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </LanguageProvider>
    </ProjectProvider>
  </StrictMode>,
)
