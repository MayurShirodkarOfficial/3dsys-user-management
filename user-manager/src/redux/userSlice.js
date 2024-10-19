import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../services/userServices';

//initial state
const initialState = {
    users: [],
    loading: false,
    error: null,
    selectedUser: null,  
    isUserModalOpen: false, 
    deleteModalOpen: false,
};

// Async thunks 
export const fetchUsers = createAsyncThunk('users/fetchUsers', userService.fetchUsers);
export const addUser = createAsyncThunk('users/addUser', userService.addUser);
export const updateUser = createAsyncThunk('users/updateUser', userService.updateUser);
export const deleteUser = createAsyncThunk('users/deleteUser', userService.deleteUser);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setIsUserModalOpen: (state, action) => {
            state.isUserModalOpen = action.payload;
        },
        setDeleteModalOpen: (state, action) => {
            state.deleteModalOpen = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload); 
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload; 
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { setSelectedUser, setIsUserModalOpen, setDeleteModalOpen } = userSlice.actions;
export default userSlice.reducer;
