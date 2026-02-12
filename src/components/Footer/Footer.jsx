import React from 'react';
import { useLang } from '../../context/LanguageContext';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoMdMail, IoMdCall } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
    const { t } = useLang();

    return (
        <footer className="footer" id="contact">
            <div className="container footer-container">
                <div className="footer-brand">
                    <span className="logo">Care<span className="gradient-text">Ai</span></span>
                    <p>{t('footer.subtitle')}</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="#" aria-label="GitHub"><FaGithub /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="#">Press Kit</a>
                    </div>
                    <div className="footer-col">
                        <h4>Product</h4>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Security</a>
                        <a href="#">Integrations</a>
                    </div>
                    <div className="footer-col">
                        <h4>Support</h4>
                        <a href="#">Help Center</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <a href="mailto:info@careai.com" className="contact-item">
                            <IoMdMail /> info@careai.com
                        </a>
                        <a href="tel:+201234567890" className="contact-item">
                            <IoMdCall /> +20 123 456 7890
                        </a>
                        <a href="#" className="contact-item">
                            <MdLocationOn /> Cairo, Egypt
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>{t('footer.copyright')}</p>
                <p>Made with ❤️ for a healthier world</p>
            </div>
        </footer>
    );
};

export default Footer;
