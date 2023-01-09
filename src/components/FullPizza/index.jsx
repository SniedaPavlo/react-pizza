import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import s from './FullPizza.module.scss'

function FullPizza() {

    const params = useParams()
    const [pizza, setPizza] = useState('')

    React.useEffect(() => {
        try {
            async function fetchPizzaById() {
                const res = await axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?/${params.id}`) // здесь запрос по айдишке не работает, все равно возращает весь массив пиц
                const item = res.data.find((obj) => obj.id === Number(params.id))
                setPizza(item)
            }
            fetchPizzaById()
        } catch (error) {
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