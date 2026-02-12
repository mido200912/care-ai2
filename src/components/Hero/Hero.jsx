import React, { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';
import './Hero.css';

const Hero = () => {
    const { t } = useLang();
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const fullText = t('hero.title') || "CareAi: Your Personalized AI Health Companion";

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && currentIndex < fullText.length) {
                setDisplayedText(fullText.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } else if (isDeleting && currentIndex > 0) {
                setDisplayedText(fullText.substring(0, currentIndex - 1));
                setCurrentIndex(currentIndex - 1);
            } else if (currentIndex === fullText.length && !isDeleting) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (currentIndex === 0 && isDeleting) {
                setIsDeleting(false);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentIndex, isDeleting, fullText]);

    return (
        <section className="hero" id="hero">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        {displayedText}
                        <span className="cursor">|</span>
                    </h1>
                    <p className="hero-subtitle fade-in">
                        {t('hero.subtitle') || "Connect with hospitals, manage health, and get AI advice."}
                    </p>
                    <div className="hero-buttons fade-in">
                        <button className="btn btn-primary btn-lg glow-effect">
                            {t('hero.cta') || "Get Started"}
                        </button>
                        <button className="btn btn-secondary btn-lg">
                            {t('hero.secondaryCta') || "Learn More"}
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="ai-card glass-card">
                        <div className="card-header">
                            <div className="ai-icon-wrapper">
                                <div className="ai-icon pulse"></div>
                            </div>
                            <div className="card-title-wrapper">
                                <h3>AI Diagnosis</h3>
                                <span className="status-badge">
                                    <span className="status-dot"></span>
                                    Processing
                                </span>
                            </div>
                            <div className="secure-badge">
                                <span className="lock-icon">🔒</span>
                                Secure Profile
                            </div>
                        </div>

                        <div className="progress-wrapper">
                            <div className="progress-bar">
                                <div className="progress-fill gradient-bar"></div>
                            </div>
                        </div>

                        <div className="diagnosis-result">
                            <p className="result-text">
                                "Symptoms analysis complete. Recommend consulting a cardiologist for mild arrhythmia."
                            </p>
                        </div>

                        <div className="emergency-link">
                            <span className="emergency-icon">🚨</span>
                            <span>Emergency Link</span>
                        </div>
                    </div>

                    {/* Floating vital cards */}
                    <div className="vital-card float-1">
                        <div className="vital-icon">❤️</div>
                        <div className="vital-data">
                            <span className="vital-value">72</span>
                            <span className="vital-label">BPM</span>
                        </div>
                    </div>

                    <div className="vital-card float-2">
                        <div className="vital-icon">🌡️</div>
                        <div className="vital-data">
                            <span className="vital-value">36.6°</span>
                            <span className="vital-label">Temp</span>
                        </div>
                    </div>

                    <div className="vital-card float-3">
                        <div className="vital-icon">💧</div>
                        <div className="vital-data">
                            <span className="vital-value">98%</span>
                            <span className="vital-label">O₂</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Background */}
            <div className="bg-animated">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>
        </section>
    );
};

export default Hero;
