import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setDeleteModalOpen, setSelectedUser } from '../../redux/userSlice';
import { toast } from 'react-toastify';

const DeleteConfirmModal = () => {
    const dispatch = useDispatch();
    const { deleteModalOpen, selectedUser, loading } = useSelector(state => state.users);

    const handleConfirm = async () => {
        if (selectedUser) {
            try {
                await dispatch(deleteUser(selectedUser._id)).unwrap();
                toast.success('User deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete user.');
            } finally {
                dispatch(setDeleteModalOpen(false)); 
                dispatch(setSelectedUser(null));
            }
        }
    };

    if (!deleteModalOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            aria-modal="true"
            role="dialog"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <div className="bg-white rounded p-6 w-96">
                <h2 id="delete-modal-title" className="text-lg font-bold mb-4">
                    Confirm Deletion
                </h2>
                <p id="delete-modal-description">Are you sure you want to delete this user?</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => dispatch(setDeleteModalOpen(false))} 
                        className="mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
