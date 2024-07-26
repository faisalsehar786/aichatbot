import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Hook to manage dark mode
 * @returns {Array} [theme, setTheme]
 */
const useDarkMode = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = window.document.documentElement;
      html.setAttribute('data-bs-theme', theme);
    }
   
  }, [theme]);

  return [theme, setTheme];
};

export default useDarkMode;
