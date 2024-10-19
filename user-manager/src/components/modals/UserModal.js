import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser , setIsUserModalOpen} from '../../redux/userSlice';
import { toast } from 'react-toastify';

const UserModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const { selectedUser, loading } = useSelector(state => state.users); 
    const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });

    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            setFormData({ name: '', email: '', age: '', gender: '' }); 
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedUser) {
                await dispatch(updateUser({ ...formData, _id: selectedUser._id })).unwrap(); 
                toast.success('User updated successfully!');
            } else {
                await dispatch(addUser(formData)).unwrap();
                toast.success('User added successfully!');
            }
            dispatch(setIsUserModalOpen(false));
        } catch (error) {
            toast.error('Error saving user data!');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded p-6 w-96">
                <h2 className="text-lg font-bold mb-4">{selectedUser ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block mb-1">Age</label>
                        <input
                            id="age"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block mb-1">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : selectedUser ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
