import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

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
        e.preventDefault();
        setScrollProgress(prev => {
            const delta = e.deltaY > 0 ? 0.15 : -0.15;
            const newProgress = Math.max(0, Math.min(1, prev + delta));

            if (newProgress === 1)
            {
                setPageNumber(p => p + 1);
                return 0;
            }
            if (newProgress === 0 && pageNumber != 0)
            {
                setPageNumber(p => p - 1);
                return 0.95;
            }

            return newProgress;
        });
    }, [pageNumber]);

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