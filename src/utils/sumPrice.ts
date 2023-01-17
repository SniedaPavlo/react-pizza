import { PizzaCartType } from '../Redux/Slices/cartSlice'

export const sumPrice = (items: PizzaCartType[]) => {
    return items.reduce((acc, el) => {
        return acc += (el.price * el.count)
    }, 0)
}