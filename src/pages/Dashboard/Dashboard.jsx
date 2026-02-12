import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { medicalAPI } from '../../services/api';
import { FaUser, FaHeartbeat, FaComments, FaHospital, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await medicalAPI.getProfile();
            setProfile(response.data.data);
        } catch (error) {
            console.log('No profile yet');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-page">
            <div className={`dashboard-sidebar glass-card ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-sidebar-btn" onClick={toggleSidebar}>
                    <FaTimes />
                </button>

                <div className="sidebar-header">
                    <h2>Care<span className="gradient-text">Ai</span></h2>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/dashboard" className="nav-item active" onClick={() => setIsSidebarOpen(false)}>
                        <FaUser /> Dashboard
                    </Link>
                    <Link to="/medical-profile" className="nav-item" onClick={() => setIsSidebarOpen(false)}>
                        <FaHeartbeat /> Medical Profile
                    </Link>
                    <Link to="/chat" className="nav-item" onClick={() => setIsSidebarOpen(false)}>
                        <FaComments /> AI Consultation
                    </Link>

                    <Link to="/settings" className="nav-item" onClick={() => setIsSidebarOpen(false)}>
                        <FaCog /> Settings
                    </Link>
                </nav>

                <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt /> Logout
                </button>
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className="dashboard-content">
                <div className="dashboard-header mobile-header">
                    <button className="menu-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <div>
                        <h1>Welcome, {user?.name}! 👋</h1>
                        <p>Here's your health overview</p>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="dashboard-grid">
                        <div className="stat-widget glass-card">
                            <div className="widget-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                                <FaUser />
                            </div>
                            <div className="widget-content">
                                <h3>Profile Status</h3>
                                <p className="widget-value">
                                    {profile ? 'Complete' : 'Incomplete'}
                                </p>
                                {!profile && (
                                    <Link to="/medical-profile" className="widget-link">
                                        Complete Profile →
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="stat-widget glass-card">
                            <div className="widget-icon" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>
                                <FaHeartbeat />
                            </div>
                            <div className="widget-content">
                                <h3>Health Monitoring</h3>
                                <p className="widget-value">
                                    {profile ? 'Active' : 'Pending'}
                                </p>
                                <p className="widget-desc">
                                    {profile ? 'Tracking your vitals' : 'Set up your profile first'}
                                </p>
                            </div>
                        </div>

                        <div className="stat-widget glass-card">
                            <div className="widget-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                                <FaComments />
                            </div>
                            <div className="widget-content">
                                <h3>AI Consultations</h3>
                                <p className="widget-value">Available 24/7</p>
                                <Link to="/chat" className="widget-link">
                                    Start Chat →
                                </Link>
                            </div>
                        </div>


                    </div>
                )}

                {profile && (
                    <div className="profile-overview glass-card">
                        <h2>Your Medical Profile</h2>
                        <div className="profile-grid">
                            <div className="profile-item">
                                <span className="profile-label">Age:</span>
                                <span className="profile-value">{profile.age} years</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Gender:</span>
                                <span className="profile-value">{profile.gender}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Weight:</span>
                                <span className="profile-value">{profile.weight} kg</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Height:</span>
                                <span className="profile-value">{profile.height} cm</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Disease Type:</span>
                                <span className="profile-value">{profile.diseaseType}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Duration:</span>
                                <span className="profile-value">{profile.durationInYears} years</span>
                            </div>
                        </div>
                        <Link to="/medical-profile" className="btn btn-primary">
                            Edit Profile
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;