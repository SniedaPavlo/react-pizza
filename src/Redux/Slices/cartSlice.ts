import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { setInitionalCart } from '../../utils/setInitionalCart'
import { setLSCart } from '../../utils/setLSCart'
import { sumPrice } from '../../utils/sumPrice'
import { sumItems } from '../../utils/sumItems'

export type PizzaCartType = {
    price: number,
    title: string,
    imageUrl: string,
    sizeCount: number,
    types: number[],
    id: number,
    typesCount: number
    count: number
}

export interface InitialStateInterface {
    totalPrice: number,
    totalItems: number,
    items: PizzaCartType[],
}

const setInitionalState = setInitionalCart()

export const initialState: InitialStateInterface = {
    totalPrice: setInitionalState.totalPrice,
    totalItems: setInitionalState.totalItems,
    items: setInitionalState.items,
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
            state.totalPrice = sumPrice(state.items)

            state.totalItems = sumItems(state.items)

            setLSCart('cart', state.items)
            setLSCart('totalItems', sumItems(state.items))
            setLSCart('totalPrice', sumPrice(state.items))
        },
        minusItem(state, action) {
            const found = state.items.find(obj => obj.id === action.payload)
            if (found) {
                found.count--
            }

            state.totalPrice = sumPrice(state.items)

            state.totalItems = sumItems(state.items)

            setLSCart('cart', state.items)
            setLSCart('totalItems', sumItems(state.items))
            setLSCart('totalPrice', sumPrice(state.items))
        },
        deleteItem(state, action) {
            const confirm = window.confirm('Ты уверен? Подумай хорошо')
            if (confirm) state.items = state.items.filter((obj) => obj.id !== action.payload)

            state.totalPrice = sumPrice(state.items)

            state.totalItems = sumItems(state.items)

            setLSCart('cart', state.items)
            setLSCart('totalItems', sumItems(state.items))
            setLSCart('totalPrice', sumPrice(state.items))
        },
        clearCart(state) {
            if (state.items.length > 0) {
                const confirm = window.confirm('болван ты готовый бути голодний?')
                if (confirm) {
                    state.items = [];
                    state.totalItems = 0;
                    state.totalPrice = 0;
                }

                setLSCart('cart', state.items)
                setLSCart('totalItems', sumItems(state.items))
                setLSCart('totalPrice', sumPrice(state.items))
            }
        }
    }
})

export const selectCart = (state: RootState) => state.cartSlice
export const myObjofItems = (id: number, state: RootState) => state.cartSlice.items.find((obj) => obj.id === id)

export const { addItem, minusItem, deleteItem, clearCart } = cartSlice.actions
export default cartSlice.reducer