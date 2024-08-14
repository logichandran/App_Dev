// src/components/Reports.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';

function Reports() {
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = () => {
        axios.get('http://localhost:8000/api/reports/')
            .then(response => {
                setReports(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching reports:", error);
                setLoading(false);
            });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredReports = reports.filter(report => 
        report.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="reports-container">
            <h2>Reports</h2>

            <div className="report-filter">
                <input
                    type="text"
                    placeholder="Filter by name..."
                    value={filter}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>

            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map(report => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.name}</td>
                                <td>{new Date(report.date).toLocaleDateString()}</td>
                                <td>{report.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Reports;
