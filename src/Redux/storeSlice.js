// src/redux/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    input: "",
};

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        addInputData: (state, action) => {
            state.input = action.payload
        }
    },
});

export const { addInputData } = inputSlice.actions;

export default inputSlice.reducer;
