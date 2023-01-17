import { PizzaCartType } from '../Redux/Slices/cartSlice'

// первым аргументов указываем в какой ключ LoclStorage записать данные переданные вторим аргументом 
export const setLSCart = (data: string, state: PizzaCartType[] | number,) => {
    const json = JSON.stringify(state)
    localStorage.setItem(`${data}`, json)
}