import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import s from './FullPizza.module.scss'


const FullPizza: React.FC = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()

    React.useEffect(() => {
        try {
            async function fetchPizzaById() {
                const res = await axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?`) // здесь запрос по айдишке не работает, все равно возращает весь массив пиц 
                const item: { imageUrl: string, title: string, price: number } = res.data.find((obj: { id: number }) => obj.id === Number(id))
                setPizza(item)
            }
            fetchPizzaById()
        } catch (error: any) {
            console.log(error.message)
        }
    }, [])

    return (
        <div>
            {pizza
                ?
                <div className='container'>
                    <img src={pizza.imageUrl} alt="" />
                    <p>{pizza.title}</p>
                    <p>Цена : {pizza.price}</p>

                </div>
                :
                <div className={s.loading}> Пицa загружаются </div>}
        </div>



    )
}

export default FullPizza