// src/components/Signup.js
import React, { useState } from 'react';
import './Auth.css'; // Shared styling for Login and Signup

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (email && password) {
            console.log("Signup submitted:", { email, password });
            // Perform signup operation (e.g., call API)
        } else {
            setError("All fields are required.");
        }
    };

    return (
        <div className="auth-container">
            <h2></h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignUp</button>
                <p className="auth-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
}

export default Signup;
