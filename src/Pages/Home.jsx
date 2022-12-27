import React from "react";
import Skeleton from '../components/PizzaBlog/Skeleton';
import PizzaBlog from '../components/PizzaBlog/';
import Categories from '../components/Сategories';
import Sort from '../components/Sort';

function Home() {

    const [statePizzas, setPizzas] = React.useState([])
    const [pizzasLoading, setLoading] = React.useState(true)
    const [sort, setSort] = React.useState({ name: 'популярности', sortProperty: 'rating' })
    const [СategoryId, setСategoriesId] = React.useState(0)

    console.log(sort)

    const order = sort.sortProperty.split('')[0] === '-' ? 'desc' : 'asc';
    const sortPut = sort.sortProperty.replace('-', '');
    const category = СategoryId > 0 ? `&category=${СategoryId}` : '';


    React.useEffect(() => {
        setLoading(true)
        fetch(`
        https://63a4cc372a73744b00802459.mockapi.io/items?${category}&sortBy=${sortPut}&order=${order}`
        )
            .then((res) => res.json())
            .then((json) => {
                setPizzas(json)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [СategoryId, sort])


    function setСategories(i) {
        setСategoriesId(i)
    } // или сразу можно передать в пропсы этот кол бек 


    return (
        <div className="container">
            <div>
                <div className="content__top">
                    <Sort onChangeValue={setSort} value={sort} />
                    <Categories value={СategoryId} onClickCategories={setСategories} />
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