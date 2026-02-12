import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { FaUser, FaLock, FaTrash, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            await authAPI.deleteAccount();
            logout();
            navigate('/');
        } catch (error) {
            alert('Failed to delete account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-page">
            <div className="container settings-container">
                <button onClick={() => navigate('/dashboard')} className="back-link">
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <h1 className="page-title gradient-text">Account Settings</h1>

                <div className="settings-section glass-card">
                    <div className="section-header">
                        <FaUser className="section-icon" />
                        <h3>Profile Information</h3>
                    </div>
                    <div className="section-content">
                        <div className="info-row">
                            <span className="info-label">Name</span>
                            <span className="info-value">{user?.name}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Email</span>
                            <span className="info-value">{user?.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Age</span>
                            <span className="info-value">{user?.age}</span>
                        </div>
                    </div>
                </div>



                <div className="settings-section glass-card danger-zone">
                    <div className="section-header">
                        <FaExclamationTriangle className="section-icon danger" />
                        <h3 className="danger-text">Danger Zone</h3>
                    </div>
                    <div className="section-content">
                        <p className="danger-desc">
                            Deleting your account is permanent. All your data including medical history will be erased.
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn btn-danger btn-full"
                        >
                            <FaTrash /> Delete Account
                        </button>
                    </div>
                </div>

                {showDeleteModal && (
                    <div className="modal-overlay">
                        <div className="modal-content glass-card">
                            <FaExclamationTriangle className="modal-icon" />
                            <h3>Delete Account?</h3>
                            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                            <div className="modal-actions">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="btn btn-danger"
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Yes, Delete Permanently'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
