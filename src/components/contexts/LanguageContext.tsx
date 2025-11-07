import {createContext, useContext, useState, type ReactNode } from 'react';

type LanguageContextType = {
    language: string | null,
    changeLanguage:(lang: string | null) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
    // Must be null at first, so the language buttons do not display a active state at first (And so we can display the continue button only when user chooses)
    const [language, setLanguage] = useState<string | null>(null);

    const changeLanguage = (lang: string | null) => {
        setLanguage(lang);
    }

    return (
        <LanguageContext.Provider value={{language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(`useLanguage must be used inside a Language Provider`)
    }
    return context;
}