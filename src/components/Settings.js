// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function Settings() {
    const [settings, setSettings] = useState({
        username: '',
        email: '',
        password: '',
        notificationPreferences: ''
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = () => {
        axios.get('http://localhost:8000/api/settings/')
            .then(response => {
                setSettings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching settings:", error);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/settings/', settings)
            .then(response => {
                setMessage('Settings updated successfully!');
                setEditing(false);
            })
            .catch(error => {
                console.error("Error updating settings:", error);
                setMessage('Error updating settings.');
            });
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>

            {loading ? (
                <p>Loading settings...</p>
            ) : (
                <form onSubmit={handleSubmit} className="settings-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={settings.username}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={settings.password}
                            onChange={handleChange}
                            disabled={!editing}
                            required={editing} // Only required if editing
                        />
                    </div>
                    <div className="form-group">
                        <label>Notification Preferences:</label>
                        <textarea
                            name="notificationPreferences"
                            value={settings.notificationPreferences}
                            onChange={handleChange}
                            disabled={!editing}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit" disabled={!editing}>
                        Save Changes
                    </button>
                    <button
                        type="button"
                        className="btn-edit"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? 'Cancel' : 'Edit Settings'}
                    </button>
                    {message && <p className="message">{message}</p>}
                </form>
            )}
        </div>
    );
}

export default Settings;
