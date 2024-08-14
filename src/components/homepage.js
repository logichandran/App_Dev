// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            <header className="header">
                <h1>Logistics Management System</h1>
                <nav className="navbar">
                    <ul>
                        <li><Link to="/shipments">Shipments</Link></li>
                        <li><Link to="/vehicles">Vehicles</Link></li>
                        <li><Link to="/inventory">Inventory</Link></li>
                        <li><Link to="/report">Report</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                    </ul>
                    <div className="header-buttons">
                        <Link to="/login" className="btn-login">Login</Link>
                        <Link to="/signup" className="btn-signup">Sign Up</Link>
                    </div>
                </nav>
            </header>

            <section className="hero-section">
                <div className="hero-content">
                    <h2>Efficiently Manage Your Logistics Operations</h2>
                    <p>Streamline your logistics processes with our comprehensive management system.</p>
                    <Link to="/get-started" className="cta-button">Get Started</Link>
                </div>
            </section>

            <section className="features-section">
                <h3>Our Key Features</h3>
                <div className="features">
                    <div className="feature">
                        <h4>Real-time Tracking</h4>
                        <p>Monitor your shipments with real-time updates and tracking information.</p>
                    </div>
                    <div className="feature">
                        <h4>Fleet Management</h4>
                        <p>Manage your vehicle fleet with ease, including maintenance and routing.</p>
                    </div>
                    <div className="feature">
                        <h4>Inventory Management</h4>
                        <p>Keep track of your inventory levels, orders, and stock movements.</p>
                    </div>
                    <div className="feature">
                        <h4>Comprehensive Reports</h4>
                        <p>Generate detailed reports to analyze performance and improve efficiency.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Logistics Management System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
