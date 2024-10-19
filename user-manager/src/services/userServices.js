import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

export const updateUser = async (userData) => {
    const response = await axios.put(`${API_URL}/${userData._id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
};
