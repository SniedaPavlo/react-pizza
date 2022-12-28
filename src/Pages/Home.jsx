import React from "react";
import Skeleton from '../components/PizzaBlog/Skeleton';
import PizzaBlog from '../components/PizzaBlog/';
import Categories from '../components/Сategories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
function Home() {
    //контекст
    const { searchValue } = React.useContext(SearchContext)
    //хуки
    const [statePizzas, setPizzas] = React.useState([])
    const [pizzasLoading, setLoading] = React.useState(true)
    const [sort, setSort] = React.useState({ name: 'популярности', sortProperty: 'rating' })
    const [currentPage, setCurrentPage] = React.useState(0)
    const [СategoryId, setСategoriesId] = React.useState(0)

    //Массивы state
    // const PizzasFilter = statePizzas.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ? true : false)
    const Pizzas = statePizzas.map((obj) => <  PizzaBlog {...obj} key={obj.id.toString()} />)
    const SkeletonArr = [...new Array(6)].map((el, index) => < Skeleton key={index} />)
    //запросы
    const order = sort.sortProperty.split('')[0] === '-' ? 'desc' : 'asc';
    const sortPut = sort.sortProperty.replace('-', '');
    const category = СategoryId > 0 ? `&category=${СategoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : ''


    React.useEffect(() => {
        setLoading(true)
        fetch(`
        https://63a4cc372a73744b00802459.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortPut}&order=${order}&${search}`
        )
            .then((res) => res.json())
            .then((json) => {
                setPizzas(json)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [СategoryId, sort, searchValue, currentPage])


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
                        ? SkeletonArr
                        : Pizzas}
                </div>
            </div>
            <Pagination onChangeCurrent={(number) => setCurrentPage(number)} />
        </div>
    )
}

export default Home