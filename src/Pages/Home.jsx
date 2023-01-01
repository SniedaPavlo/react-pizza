import React from "react";
import Skeleton from '../components/PizzaBlog/Skeleton';
import PizzaBlog from '../components/PizzaBlog/';
import Categories from '../components/Сategories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination'
import axios from 'axios'
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage } from './../Redux/Slices/filterSlice'

function Home() {

    //контекст
    const { searchValue } = React.useContext(SearchContext)
    //хуки
    const { sort, CategoryId, currentPage } = useSelector((state) => state.filterSlice)
    const dispatch = useDispatch()
    const [statePizzas, setPizzas] = React.useState([])
    const [pizzasLoading, setLoading] = React.useState(true)

    //Массивы state
    // const PizzasFilter = statePizzas.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ? true : false)
    const Pizzas = statePizzas.map((obj) => <  PizzaBlog {...obj} key={obj.id.toString()} />)
    const SkeletonArr = [...new Array(6)].map((el, index) => < Skeleton key={index} />)
    //запросы
    const order = sort.sortProperty.split('')[0] === '-' ? 'desc' : 'asc';
    const sortPut = sort.sortProperty.replace('-', '');
    const category = CategoryId > 0 ? `&category=${CategoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : ''


    React.useEffect(() => {
        setLoading(true)
        axios.get(`https://63a4cc372a73744b00802459.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortPut}&order=${order}&${search}`)
            .then((res) => {
                setPizzas(res.data)
                setLoading(false)
                window.scrollTo(0, 0)
            })

    }, [CategoryId, sort, searchValue, currentPage])

    function setСategories(i) {
        dispatch(setCategoryId(i))
    } // или сразу можно передать в пропсы этот кол бек 

    function onChangeCurrent(namber) {
        dispatch(setCurrentPage(namber))
    }

    return (
        <div className="container">
            <div>
                <div className="content__top">
                    <Sort />
                    <Categories value={CategoryId} onClickCategories={setСategories} />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {pizzasLoading
                        ? SkeletonArr
                        : Pizzas}
                </div>
            </div>
            <Pagination currentPage={currentPage} onChangeCurrent={onChangeCurrent} />
        </div>
    )
}

export default Home