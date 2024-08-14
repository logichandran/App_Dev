// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Vehicles from './components/vehicles';
import Shipments from './components/Shipments';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/homepage';
import Inventory from './components/Inventory';
import Reports from './components/Report';
import Settings from './components/Settings';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/vehicles" element={<Vehicles/>} />
                    <Route path="/shipments" element={<Shipments/>} />
                    <Route path="/inventory" element={<Inventory/>} />
                    <Route path="/report" element={<Reports/>} />
                    <Route path="/settings" element={<Settings/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
