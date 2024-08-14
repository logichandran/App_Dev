
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Vehicles.css';




function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        registration_number: '',
        driver_name: '',
        capacity: '',
        availability_status: true,
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch all vehicles
    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('http://localhost:5000/vehicles/')
            .then(response => {
                setVehicles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching vehicles:", error);
                setLoading(false);
            });
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            axios.put('http://localhost:5000/vehicles/${formData.id}/', formData)
                .then(response => {
                    setEditing(false);
                    fetchVehicles();
                    resetForm();
                })
                .catch(error => console.error("Error updating vehicle:", error));
        } else {
            axios.post('http://localhost:5000/vehicles/', formData)
                .then(response => {
                    fetchVehicles();
                    resetForm();
                })
                .catch(error => console.error("Error creating vehicle:", error));
        }
    };


    const handleEdit = (vehicle) => {
        setFormData(vehicle);
        setEditing(true);
    };


    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/vehicles/${id}/')
            .then(response => {
                fetchVehicles();
            })
            .catch(error => console.error("Error deleting vehicle:", error));
    };

    const resetForm = () => {
        setFormData({
            id: null,
            registration_number: '',
            driver_name: '',
            capacity: '',
            availability_status: true,
        });
    };

    return (
        <div>
            <h2>Vehicles</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Registration Number:</label>
                    <input
                        type="text"
                        name="registration_number"
                        value={formData.registration_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Driver Name:</label>
                    <input
                        type="text"
                        name="driver_name"
                        value={formData.driver_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Capacity:</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Availability Status:</label>
                    <select
                        name="availability_status"
                        value={formData.availability_status}
                        onChange={handleChange}
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                </div>
                <button type="submit">{editing ? 'Update' : 'Create'} Vehicle</button>
                {editing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            {loading ? (
                <p>Loading vehicles...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Registration Number</th>
                            <th>Driver Name</th>
                            <th>Capacity</th>
                            <th>Availability Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.registration_number}</td>
                                <td>{vehicle.driver_name}</td>
                                <td>{vehicle.capacity}</td>
                                <td>{vehicle.availability_status ? 'Available' : 'Unavailable'}</td>
                                <td>
                                    <button onClick={() => handleEdit(vehicle)}>Edit</button>
                                    <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Vehicles;
