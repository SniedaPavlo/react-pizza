import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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

type AppDispatch = typeof store.dispatch

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>




