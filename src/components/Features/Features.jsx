import React from 'react';
import { useLang } from '../../context/LanguageContext';
import { FaHeartbeat, FaBrain, FaHospital, FaBell, FaMicrochip } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import './Features.css';

const Features = () => {
    const { t } = useLang();

    const features = [
        {
            icon: <FaHeartbeat />,
            title: t('features.profile.title'),
            desc: t('features.profile.desc'),
            color: "#ef4444" // Red for heart
        },
        {
            icon: <FaBrain />,
            title: t('features.ai.title'),
            desc: t('features.ai.desc'),
            color: "#8b5cf6" // Purple for AI
        },
        {
            icon: <FaHospital />,
            title: t('features.hospital.title'),
            desc: t('features.hospital.desc'),
            color: "#06b6d4" // Cyan for hospital
        },
        {
            icon: <FaBell />,
            title: t('features.emergency.title'),
            desc: t('features.emergency.desc'),
            color: "#f59e0b" // Amber for alerts
        },
        {
            icon: <FaMicrochip />,
            title: t('features.hardware.title'),
            desc: t('features.hardware.desc'),
            color: "#10b981" // Green for hardware
        },
        {
            icon: <IoMdAlert />,
            title: "Emergency Response",
            desc: "Instant connection to emergency services and nearest hospitals during critical situations.",
            color: "#dc2626" // Deep red for emergency
        }
    ];

    return (
        <section className="features-section" id="features">
            <div className="container">
                <h2 className="section-title text-center gradient-text">
                    {t('features.title')}
                </h2>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            className="feature-card"
                            key={index}
                            style={{ '--accent-color': feature.color }}
                            data-index={index}
                        >
                            <div className="feature-icon-wrapper">
                                <span className="feature-icon">{feature.icon}</span>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>

                            {/* Animated corner dots */}
                            <div className="corner-dots">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating particles */}
            <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
        </section>
    );
};

export default Features;
