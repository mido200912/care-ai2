import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import About from '../../components/About/About';
import Footer from '../../components/Footer/Footer';

const LandingPage = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Features />
                <About />
            </main>
            <Footer />
        </>
    );
};

export default LandingPage;
