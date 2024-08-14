// src/components/Inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

function Inventory() {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        quantity: '',
        location: '',
        category: '',
    });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const fetchInventoryItems = () => {
        axios.get('http://localhost:8000/api/inventory/')
            .then(response => {
                setInventoryItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching inventory items:", error);
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
            axios.put(`http://localhost:8000/api/inventory/${formData.id}/`, formData)
                .then(response => {
                    setEditing(false);
                    fetchInventoryItems();
                    resetForm();
                })
                .catch(error => console.error("Error updating inventory item:", error));
        } else {
            axios.post('http://localhost:8000/api/inventory/', formData)
                .then(response => {
                    fetchInventoryItems();
                    resetForm();
                })
                .catch(error => console.error("Error creating inventory item:", error));
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditing(true);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/inventory/${id}/`)
            .then(response => {
                fetchInventoryItems();
            })
            .catch(error => console.error("Error deleting inventory item:", error));
    };

    const resetForm = () => {
        setFormData({
            id: null,
            name: '',
            quantity: '',
            location: '',
            category: '',
        });
    };

    return (
        <div className="inventory-container">
            <h2>Inventory Management</h2>

            <form onSubmit={handleSubmit} className="inventory-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">{editing ? 'Update' : 'Add'} Item</button>
                {editing && <button type="button" className="btn-cancel" onClick={resetForm}>Cancel</button>}
            </form>

            {loading ? (
                <p>Loading inventory...</p>
            ) : (
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Location</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.location}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Inventory;
