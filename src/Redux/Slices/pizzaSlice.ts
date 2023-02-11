import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

// вместо ипрта я заново создаю
export type SortType = {
    name: string,
    sortProperty: string
}

enum TypeStatus {
    LOADING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error'
}

type PizzaType = {
    category: number,
    id: number,
    imageUrl: string,
    price: number,
    rating: number // сумневаюсь
    sizes: number[],
    title: string,
    types: number,
}

interface InterfaceInitialPizzas {
    pizzas: PizzaType[],
    status: 'pending' | 'success' | 'error',
    message: string
}

interface InterfaceFetchPizzas {
    order: string,
    sortPut: SortType,
    category: string,
    search: string,
    currentPage: number
}
interface ResType {
    data: PizzaType[],
    message: string
}



const fetchPizzas = createAsyncThunk<ResType, InterfaceFetchPizzas>('pizza/fetchPizzasByIdStatus',
    async ({ order, sortPut, category, search, currentPage }, thunkAPI) => {

        const res = await axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?page=${currentPage}&limit=4${category}&sortPut=${sortPut}&order=${order}&${search}`)

        if (res.data.length < 1) {
            return thunkAPI.fulfillWithValue({ data: [], message: 'Пиц не найдено', })
        }
        // if (res.data === undefined) {
        //     return thunkAPI.rejectWithValue({ message: 'Ошибка запроса' })
        // }
        else {
            return thunkAPI.fulfillWithValue({ data: res.data, message: 'запрос успешный' } as ResType)
        }
    },

)

const initialState: InterfaceInitialPizzas = {
    pizzas: [],
    status: 'pending',
    message: ''
}

const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {

        setPizza(state, action: PayloadAction<PizzaType[]>) {
            // @ts-ignore
            state.pizzas = fetchPizzas(action.payload)
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchPizzas.pending, (state) => {
            // pending state doesn't det payload anyway ! That's ridiculous !
            state.status = TypeStatus.LOADING
            state.message = 'ожидание запроса'
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload.data
            state.message = action.payload.message
            state.status = TypeStatus.SUCCESS
        });
        builder.addCase(fetchPizzas.rejected, (state,) => {
            state.pizzas = []
            state.status = TypeStatus.ERROR
            state.message = 'Ошибка запроса'
        });
    },
})

export const selectPizza = (state: RootState) => state.pizza

export { fetchPizzas }
export const { setPizza, } = pizzaSlice.actions
export default pizzaSlice.reducer
