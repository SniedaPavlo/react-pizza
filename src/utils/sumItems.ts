import { PizzaCartType } from '../Redux/Slices/cartSlice'

export const sumItems = (items: PizzaCartType[]) => {
    return items.reduce((acc, el) => {
        return acc += el.count
    }, 0)
}