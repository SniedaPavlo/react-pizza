import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    totalPrice: 0,
    totalItems: 0,
    items: [],

}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        addItem(state, action) {
            const found = state.items.find(obj => obj.id === action.payload.id)
            if (found) {
                found.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((acc, el) => {
                return acc += (el.price * el.count)
            }, 0)

            state.totalItems = state.items.reduce((acc, el) => {
                return acc += el.count
            }, 0)

        },
        minusItem(state, action) {
            const found = state.items.find(obj => obj.id === action.payload)
            if (found) {
                found.count--
            }

            state.totalPrice = state.items.reduce((acc, el) => {
                return acc += (el.price * el.count)
            }, 0)

            state.totalItems = state.items.reduce((acc, el) => {
                return acc += el.count
            }, 0)
        },
        deleteItem(state, action) {
            const confirm = window.confirm('Ты уверен? Подумай хорошо')
            if (confirm) state.items = state.items.filter((obj) => obj.id !== action.payload)

            state.totalPrice = state.items.reduce((acc, el) => {
                return acc += (el.price * el.count)
            }, 0)

            state.totalItems = state.items.reduce((acc, el) => {
                return acc += el.count
            }, 0)
        },
        clearCart(state) {
            if (state.items.length > 0) {
                const confirm = window.confirm('болван ты готовый бути голодний?')
                if (confirm) {
                    state.items = [];
                    state.totalItems = 0;
                    state.totalPrice = 0;
                }
            }



        }
    }
})

export const selectCart = (state) => state.cartSlice
export const myObjofItems = (id, state) => state.cartSlice.items.find((obj) => obj.id === id)

export const { addItem, minusItem, deleteItem, clearCart } = cartSlice.actions
export default cartSlice.reducer