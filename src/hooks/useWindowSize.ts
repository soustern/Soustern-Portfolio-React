import { useState, useEffect } from "react";

export function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleSize = () => setSize({width: window.innerWidth, height: window.innerHeight});

        window.addEventListener(`resize`, handleSize);

        return () => window.removeEventListener(`resize`, handleSize);
    }, [])

    return size;
}