import React from 'react';
import { useLang } from '../../context/LanguageContext';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import { FaHospital, FaHeadset } from 'react-icons/fa';
import './About.css';

const About = () => {
    const { t } = useLang();

    return (
        <section className="about-section" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className="section-title">Why Choose CareAi?</h2>
                        <ul className="about-list">
                            <li className="about-item">
                                <span className="check-icon">
                                    <FaCheckCircle />
                                </span>
                                <div>
                                    <h3>Advanced AI Diagnosis</h3>
                                    <p>Our AI analyzes symptoms with 99% accuracy against medical databases.</p>
                                </div>
                            </li>
                            <li className="about-item">
                                <span className="check-icon">
                                    <FaCheckCircle />
                                </span>
                                <div>
                                    <h3>Real-time Monitoring</h3>
                                    <p>IoT devices continuously monitor vital signs and alert you instantly.</p>
                                </div>
                            </li>
                            <li className="about-item">
                                <span className="check-icon">
                                    <FaCheckCircle />
                                </span>
                                <div>
                                    <h3>Automatic Emergency Alerts</h3>
                                    <p>Instant hospital notifications during heart attacks, fainting, or critical events.</p>
                                </div>
                            </li>
                            <li className="about-item">
                                <span className="check-icon">
                                    <FaCheckCircle />
                                </span>
                                <div>
                                    <h3>Secure Data Privacy</h3>
                                    <p>Your medical data is encrypted and only shared with your consent.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="about-stats">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <IoMdPeople />
                            </div>
                            <span className="stat-number">50k+</span>
                            <span className="stat-label">Active Patients</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaHospital />
                            </div>
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Partner Hospitals</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaHeadset />
                            </div>
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">AI Support</span>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaCheckCircle />
                            </div>
                            <span className="stat-number">99%</span>
                            <span className="stat-label">Accuracy Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
