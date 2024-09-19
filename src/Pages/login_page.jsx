import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css_folder/auth.css';
import axios from 'axios';
import BASE_URL from '../../baseURL';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BASE_URL + 'auth/login/', {
                username: email,
                password: password,
            });

            if (response.data.success) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                localStorage.setItem('isAuthenticated', 'false');
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            localStorage.setItem('isAuthenticated', 'false');
            setError('An error occurred. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 password-input-wrapper">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-field">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    {error && <p className="error-text">{error}</p>}
                </form>

                <div className="or-separator">
                    <span>OR</span>
                </div>

                <button className="btn google-btn">
                    <h5>Continue with</h5>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" className="google-logo" />
                </button>

                <p className="auth-text">
                    Don't have an account? <Link to="/signup" className="auth-link">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
