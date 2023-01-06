import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/filterSlice';
import cartSlice from './Slices/cartSlice'
import pizza from './Slices/pizzaSlice'

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        pizza
    },
})

