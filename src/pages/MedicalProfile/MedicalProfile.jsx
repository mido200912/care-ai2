import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { medicalAPI } from '../../services/api';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import './MedicalProfile.css';

const MedicalProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        diseaseType: 'heart',
        durationInYears: '',
        medications: '',
        symptoms: '',
        otherNotes: '',
        followUpWithDoctor: false
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await medicalAPI.getProfile();
            if (response.data.data) {
                const p = response.data.data;
                setFormData({
                    age: p.age || '',
                    gender: p.gender || 'male',
                    weight: p.weight || '',
                    height: p.height || '',
                    diseaseType: p.diseaseType || 'heart',
                    durationInYears: p.durationInYears || '',
                    medications: p.medications ? p.medications.join(', ') : '',
                    symptoms: p.symptoms ? p.symptoms.join(', ') : '',
                    otherNotes: p.otherNotes || '',
                    followUpWithDoctor: p.followUpWithDoctor || false
                });
            }
        } catch (error) {
            console.log('No existing profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const dataToSend = {
                ...formData,
                age: Number(formData.age),
                weight: Number(formData.weight),
                height: Number(formData.height),
                durationInYears: Number(formData.durationInYears),
                medications: formData.medications.split(',').map(s => s.trim()).filter(Boolean),
                symptoms: formData.symptoms.split(',').map(s => s.trim()).filter(Boolean)
            };

            await medicalAPI.createProfile(dataToSend);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Redirect after short delay
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to save profile'
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;

    return (
        <div className="medical-profile-page">
            <div className="container profile-container">
                <button onClick={() => navigate('/dashboard')} className="back-btn">
                    <FaArrowLeft /> Back to Dashboard
                </button>

                <div className="profile-card glass-card">
                    <div className="profile-header">
                        <h1 className="gradient-text">Medical Profile</h1>
                        <p>Update your health information for better AI diagnosis</p>
                    </div>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    max="120"
                                />
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-section-title">Chronic Conditon</div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Disease Type</label>
                                <select name="diseaseType" value={formData.diseaseType} onChange={handleChange}>
                                    <option value="heart">Heart Disease</option>
                                    <option value="diabetes">Diabetes</option>
                                    <option value="pressure">High Blood Pressure</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Duration (Years)</label>
                                <input
                                    type="number"
                                    name="durationInYears"
                                    value={formData.durationInYears}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Current Medications (comma separated)</label>
                            <textarea
                                name="medications"
                                value={formData.medications}
                                onChange={handleChange}
                                placeholder="e.g., Aspirin, Insulin, Metformin"
                                rows="2"
                            />
                        </div>

                        <div className="form-group">
                            <label>Current Symptoms (comma separated)</label>
                            <textarea
                                name="symptoms"
                                value={formData.symptoms}
                                onChange={handleChange}
                                placeholder="e.g., Headache, Dizziness, Chest Pain"
                                rows="2"
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="followUpWithDoctor"
                                    checked={formData.followUpWithDoctor}
                                    onChange={handleChange}
                                />
                                Regular follow-up with doctor?
                            </label>
                        </div>

                        <div className="form-group">
                            <label>Other Notes</label>
                            <textarea
                                name="otherNotes"
                                value={formData.otherNotes}
                                onChange={handleChange}
                                placeholder="Any allergies or surgeries?"
                                rows="3"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-save" disabled={saving}>
                            <FaSave /> {saving ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalProfile;
