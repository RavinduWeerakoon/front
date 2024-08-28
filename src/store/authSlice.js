import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    role: null,
    error: null,
    uid: null,
    email: null,
    displayName: null
    
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.email = action.payload.email;
            state.uid = action.payload.uid;
            state.displayName = action.payload.displayName;
            state.role = action.payload.role;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
        }
    }
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;