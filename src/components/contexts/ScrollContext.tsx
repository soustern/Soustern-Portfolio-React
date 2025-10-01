import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ScrollContextType = {
    scrollProgress: number,
    handleWheel: (e: WheelEvent) => void,
    pageNumber: number,
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({children}: {children: ReactNode}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    const handleWheel = useCallback((e: WheelEvent) => {
        console.log(scrollProgress, pageNumber);
        
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.05 : -0.05;
        setScrollProgress(prev => {
            const newProgress = Math.max(0, Math.min(1, prev + delta));

            if (newProgress >= 1 && prev < 1)
            {
                setPageNumber(p => p + 1);
                return 0.05;
            }
            if (newProgress === 0 && prev > 0.05 && delta < 0)
            {
                setPageNumber(p => Math.max(0, p - 1));
                return 0.95;
            }

            return newProgress;
        });
    }, []);

    return (
        <ScrollContext.Provider value={{scrollProgress, handleWheel, pageNumber}}>
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