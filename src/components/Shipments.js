// src/components/Shipments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Shipments() {
    const [shipments, setShipments] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        tracking_number: '',
        sender_name: '',
        receiver_name: '',
        origin: '',
        destination: '',
        status: 'Pending',
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = () => {
        axios.get('http://localhost:5000/shipments/')
            .then(response => {
                setShipments(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching shipments:", error);
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            axios.put('http://localhost:5000/shipments/${formData.id}/', formData)
                .then(response => {
                    setEditing(false);
                    fetchShipments();
                    resetForm();
                })
                .catch(error => console.error("Error updating shipment:", error));
        } else {
            axios.post('http://localhost:5000/shipments/', formData)
                .then(response => {
                    fetchShipments();
                    resetForm();
                })
                .catch(error => console.error("Error creating shipment:", error));
        }
    };

    const handleEdit = (shipment) => {
        setFormData(shipment);
        setEditing(true);
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/shipments/${id}/')
            .then(response => {
                fetchShipments();
            })
            .catch(error => console.error("Error deleting shipment:", error));
    };

    const resetForm = () => {
        setFormData({
            id: null,
            tracking_number: '',
            sender_name: '',
            receiver_name: '',
            origin: '',
            destination: '',
            status: 'Pending',
        });
    };

    return (
        <div>
            <h2>Shipments</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tracking Number:</label>
                    <input
                        type="text"
                        name="tracking_number"
                        value={formData.tracking_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Sender Name:</label>
                    <input
                        type="text"
                        name="sender_name"
                        value={formData.sender_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Receiver Name:</label>
                    <input
                        type="text"
                        name="receiver_name"
                        value={formData.receiver_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Origin:</label>
                    <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </div>
                <button type="submit">{editing ? 'Update' : 'Create'} Shipment</button>
                {editing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            {loading ? (
                <p>Loading shipments...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tracking Number</th>
                            <th>Sender Name</th>
                            <th>Receiver Name</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map(shipment => (
                            <tr key={shipment.id}>
                                <td>{shipment.id}</td>
                                <td>{shipment.tracking_number}</td>
                                <td>{shipment.sender_name}</td>
                                <td>{shipment.receiver_name}</td>
                                <td>{shipment.origin}</td>
                                <td>{shipment.destination}</td>
                                <td>{shipment.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(shipment)}>Edit</button>
                                    <button onClick={() => handleDelete(shipment.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Shipments;
