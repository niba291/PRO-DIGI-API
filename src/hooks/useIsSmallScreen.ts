import { useEffect, useState } from "preact/hooks";

export const useIsSmallScreen = () => {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)"); // Tailwind 'sm' es 640px

        const handleChange = () => setIsSmall(mediaQuery.matches);
        handleChange();

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isSmall;
}