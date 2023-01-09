import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchPizzas = createAsyncThunk('pizza/fetchPizzasByIdStatus',
    async ({ order, sortPut, category, search, currentPage }, thunkAPI) => {

        const res = await axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortPut}&order=${order}&${search}`)

        if (res.data.length < 1) {
            return thunkAPI.fulfillWithValue({ data: [], message: 'Пиц не найдено', })
        }
        // if (res.data === undefined) {
        //     return thunkAPI.rejectWithValue({ message: 'Ошибка запроса' })
        // }
        else {
            return thunkAPI.fulfillWithValue({ data: res.data, message: 'запрос успешный' })
        }
    },

)

const initialState = {
    pizzas: [],
    status: 'pending',
    message: ''
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
            state.message = 'ожидание запроса'
            state.status = 'pending'
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload.data
            state.message = action.payload.message
            state.status = 'success'
        });
        builder.addCase(fetchPizzas.rejected, (state,) => {
            state.pizzas = []
            state.status = 'error'
            state.message = 'Ошибка запроса'
        });
    },
})

export const selectPizza = (state) => state.pizza

export { fetchPizzas }
export const { setPizza, } = pizzaSlice.actions
export default pizzaSlice.reducer
