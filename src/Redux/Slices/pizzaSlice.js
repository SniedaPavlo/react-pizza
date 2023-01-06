import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchPizzas = createAsyncThunk('pizza/fetchPizzasByIdStatus',
    async ({ order, sortPut, category, search, currentPage }) => {
        const res = await axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortPut}&order=${order}&${search}`)
        return res.data
    }
)

const initialState = {
    pizzas: [],
    status: 'pending'
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizza(state, action) {
            state.pizzas = fetchPizzas(action.payload)
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPizzas.pending, (state) => {
            // pending state doesn't det payload anyway ! That's ridiculous !
            // state.pizzas = action.payload
            state.status = 'pending'
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload
            state.status = 'success'
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.pizzas = []
            state.status = 'error'
        });
    },
})

export { fetchPizzas }
export const { setPizza, } = pizzaSlice.actions
export default pizzaSlice.reducer
