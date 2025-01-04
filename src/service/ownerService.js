import axios from 'axios';

const API_URL = 'https://localhost:7246/api/Owner'; // Backend URL

// Fetch all owners
export const getOwners = () => axios.get(API_URL);

// Fetch an owner by ID
export const getOwnerById = (id) => axios.get(`${API_URL}/${id}`);

// Create a new owner
export const createOwner = (owner) => axios.post(API_URL, { name: owner.name });


// Update an existing owner
export const updateOwner = (id, owner) =>
    axios.put(`${API_URL}?id=${id}`, { name: owner.name });

// Delete an owner by ID
export const deleteOwner = (ownerId) => axios.delete(`${API_URL}?ownerId=${ownerId}`);
