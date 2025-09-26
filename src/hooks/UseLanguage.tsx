import { useContext } from "react";
import { LanguageContext } from "../components/contexts/LanguageContext"

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(`useLanguage must be used inside a Language Provider`)
    }
    return context;
}