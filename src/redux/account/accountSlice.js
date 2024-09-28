import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    user: {
        email: '',
        phone: '',
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
};




export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doLoginAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.user = action.payload;
        }
    },

});

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;



export default accountSlice.reducer;
