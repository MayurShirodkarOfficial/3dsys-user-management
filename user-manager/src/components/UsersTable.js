import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSelectedUser, setIsUserModalOpen, setDeleteModalOpen } from '../redux/userSlice';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import UserModal from './modals/UserModal';

const UsersTable = () => {
    const dispatch = useDispatch();
    const { users, loading, error, isUserModalOpen, deleteModalOpen } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(setIsUserModalOpen(true)); 
    };

    const handleDeleteClick = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(setDeleteModalOpen(true));
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error fetching users: {error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Name</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Email</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Age</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Gender</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 border-b text-center">No users found</td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.age}</td>
                                <td className="py-2 px-4 border-b">{user.gender}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline ml-4"
                                        onClick={() => handleDeleteClick(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            { deleteModalOpen && 
                (<DeleteConfirmModal/>
            )}

            { isUserModalOpen && (
                <UserModal/>
            )}
        </div>
    );
};

export default UsersTable;
