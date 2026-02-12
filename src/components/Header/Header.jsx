import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { MdLogin } from 'react-icons/md';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLang, t } = useLang();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo">
                    <span className="logo-icon">⚕️</span>
                    Care<span className="gradient-text">Ai</span>
                </Link>

                <nav className="nav-links">
                    <a href="#hero">{t('nav.home')}</a>
                    <a href="#features">{t('nav.features')}</a>
                    <a href="#about">{t('nav.about')}</a>
                    <a href="#contact">{t('nav.contact')}</a>
                </nav>

                <div className="header-actions">
                    <button
                        onClick={toggleTheme}
                        className="icon-btn theme-toggle"
                        aria-label="Toggle Theme"
                        title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    >
                        {theme === 'dark' ? <FaSun /> : <FaMoon />}
                    </button>

                    <button
                        onClick={toggleLang}
                        className="icon-btn lang-toggle"
                        aria-label="Toggle Language"
                        title={lang === 'en' ? 'العربية' : 'English'}
                    >
                        <FaGlobe />
                        <span className="lang-text">{lang === 'en' ? 'AR' : 'EN'}</span>
                    </button>

                    {isAuthenticated ? (
                        <button onClick={() => navigate('/dashboard')} className="btn btn-primary nav-btn">
                            <IoMdPerson />
                            <span>Dashboard</span>
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="btn btn-secondary nav-btn">
                                <MdLogin />
                                <span>{t('nav.login')}</span>
                            </button>
                            <button onClick={() => navigate('/register')} className="btn btn-primary nav-btn">
                                <IoMdPerson />
                                <span>{t('nav.register')}</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
