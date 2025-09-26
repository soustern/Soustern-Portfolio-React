import {createContext, useContext, useState, type ReactNode } from 'react';

type LanguageContextType = {
    language: string,
    changeLanguage:(lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
    const [language, setLanguage] = useState(`En`);

    const changeLanguage = (lang: string) => {
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