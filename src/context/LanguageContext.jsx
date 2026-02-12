import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');

    useEffect(() => {
        localStorage.setItem('lang', lang);
        const root = window.document.documentElement;
        root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        root.setAttribute('lang', lang);
    }, [lang]);

    const toggleLang = () => {
        setLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    const t = (path) => {
        return path.split('.').reduce((obj, key) => obj && obj[key], translations[lang]) || path;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = () => useContext(LanguageContext);
