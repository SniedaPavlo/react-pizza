import React from "react";
import Skeleton from '../components/PizzaBlog/Skeleton'
import PizzaBlog from '../components/PizzaBlog/'
import Categories from '../components/Sort'
import Sort from '../components/Сategories'

function Home() {

    const [statePizzas, setPizzas] = React.useState([])
    const [pizzasLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://63a4cc372a73744b00802459.mockapi.io/items')
            .then((res) => res.json())
            .then((json) => {
                setPizzas(json)
                setLoading(false)
            })
    }, [])

    window.scrollTo(0, 0)

    return (
        <div className="container">
            <div>
                <div className="content__top">
                    <Sort />
                    <Categories />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {pizzasLoading
                        ? [...new Array(6)].map((el, index) => < Skeleton key={index} />)
                        : statePizzas.map((obj) => <  PizzaBlog {...obj} key={obj.id.toString()} />)}
                </div>
            </div>
        </div>
    )
}

export default Home