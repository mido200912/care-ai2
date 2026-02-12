import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useLang();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card glass-card">
                    <div className="auth-header">
                        <h1 className="gradient-text">Welcome Back</h1>
                        <p>Login to access your health dashboard</p>
                    </div>

                    {error && (
                        <div className="error-alert">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">
                                <FaEnvelope /> Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FaLock /> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?
                            <Link to="/register" className="auth-link">Register here</Link>
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="auth-bg-shape shape-1"></div>
                <div className="auth-bg-shape shape-2"></div>
            </div>
        </div>
    );
};

export default Login;
