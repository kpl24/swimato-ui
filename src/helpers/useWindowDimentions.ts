import { useState, useEffect } from 'react';

export const useWindowWidth = () => {

    const getisMobile = () => {
        return window ? window.innerWidth < 900 : false
    }

    const [isMobile, setIsMobile] = useState(getisMobile());

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(getisMobile());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile };
}