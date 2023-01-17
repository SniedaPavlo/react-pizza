import { sumPrice } from './sumPrice'
import { sumItems } from './sumItems'
import { PizzaCartType } from '../Redux/Slices/cartSlice'

export const setInitionalCart = () => {

    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = sumPrice(items)
    const totalItems = sumItems(items)

    return {
        items,
        totalPrice,
        totalItems
    }

}