import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css_folder/auth.css';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        console.log("hello")
        e.preventDefault();
        axios.post('http://192.168.0.148:8001/api/auth/register/', formValues)
            .then(function (response) {
                console.log(response.message);
                console.log(response.status)
                alert("Successfully Registered")
                navigate("/login")
            })
            .catch(function (error) {
                console.log("error", error.response.data.errors)
                if (error.response.data.errors.username) {
                    alert(error?.response?.data?.errors?.username)
                } else if (error.response.data.errors.email) {
                    alert(error?.response?.data?.errors?.email)
                }
                else if (error.response.data.errors.password) {
                    alert(error?.response?.data?.errors?.email)
                }
            });
    }
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2 className="auth-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name"
                            value={formValues.name}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="email" placeholder="Enter your email" value={formValues.email}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Username</label>
                        <input type="text" className="form-control" name='username' id="username" placeholder="Enter your username"
                            value={formValues.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="password" placeholder="Create a password"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirm_password' id="password" placeholder="Create a password"
                            value={formValues.confirm_password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>
                <p className="auth-text">
                    Already have an account? <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
