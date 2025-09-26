import { useState, useEffect } from "react";

export function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
    });

    useEffect(() => {
        const handleSize = () => setSize({width: window.innerWidth})

        window.addEventListener(`resize`, handleSize);

        return () => window.removeEventListener(`resize`, handleSize);
    }, [])

    return size;
}