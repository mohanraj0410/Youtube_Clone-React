import { configureStore } from '@reduxjs/toolkit';
import storeSlice from './storeSlice';

const store = configureStore({
    reducer: {
        input: storeSlice
    },
});

export default store;
