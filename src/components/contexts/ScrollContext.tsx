import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useProject } from "./ProjectContext";

type ScrollContextType = {
    scrollProgress: number,
    handleWheel: (e: WheelEvent) => void,
    setScrollProgress: (number: number) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({children}: {children: ReactNode}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const {currentProject} = useProject(); 

    const handleWheel = useCallback((e: WheelEvent) => {
        if (currentProject !== null) return;
        setScrollProgress(prev => {
            const delta = e.deltaY > 0 ? 3 : -3;
            return Math.max(0, Math.min(100, prev + delta));
        });
    }, []);

    return (
        <ScrollContext.Provider value={{scrollProgress, handleWheel, setScrollProgress}}>
            {children}
        </ScrollContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useScroll() {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error(`useScroll must be used inside a Scroll Provider`);
    };
    return context;
}