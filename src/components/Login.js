// src/components/Login.js
import React, { useState } from 'react';
import './Auth.css'; // Shared styling for Login and Signup

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        // Example:
        if (email && password) {
            console.log("Login submitted:", { email, password });
            // Perform login operation (e.g., call API)
        } else {
            setError("Both fields are required.");
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
                <button type="submit">Login</button>
                <p className="auth-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
