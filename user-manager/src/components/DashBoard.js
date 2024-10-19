import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersTable from './UsersTable';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserModalOpen } from '../redux/userSlice'; 
import UserModal from './modals/UserModal';

const DashBoard = () => {
    const dispatch = useDispatch();
    const { isUserModalOpen, currentUser } = useSelector(state => state.users);

    const handleSuccess = (message) => {
        toast.success(message);
        dispatch(setIsUserModalOpen(false)); 
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Manager</h1>
            <button
                onClick={() =>dispatch(setIsUserModalOpen(true))} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
                Add User
            </button>
            <UsersTable />
            {isUserModalOpen && (
                <UserModal
                    user={currentUser} 
                    onClose={() => dispatch(setIsUserModalOpen(false))} 
                    onSuccess={() => handleSuccess(currentUser ? 'User updated successfully!' : 'User added successfully!')}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default DashBoard;
