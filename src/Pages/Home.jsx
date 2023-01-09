import React from "react";
import Skeleton from '../components/PizzaBlog/Skeleton';
import PizzaBlog from '../components/PizzaBlog/';
import Categories from '../components/Сategories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination'
import { list } from './../components/Sort'
import NoContent from './../components/NoContent'
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage, setParams, selectFilter, setSearchValue } from './../Redux/Slices/filterSlice'
import { fetchPizzas, selectPizza } from '../Redux/Slices/pizzaSlice'

function Home() {
    const isSearch = React.useRef(false)
    const isMounter = React.useRef(false)
    //хуки
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { sort, CategoryId, currentPage, searchValue } = useSelector(selectFilter)
    //Данные
    // const PizzasFilter = statePizzas.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase().trim()) ? true : false)
    const { pizzas, status, message } = useSelector(selectPizza)
    const Pizzas = pizzas.map((obj) => <PizzaBlog {...obj} key={obj.id.toString()} />)
    const SkeletonArr = [...new Array(6)].map((el, index) => < Skeleton key={index} />)
    //запросы
    const order = sort.sortProperty.split('')[0] === '-' ? 'desc' : 'asc';
    const sortPut = sort.sortProperty.replace('-', '');
    const category = CategoryId > 0 ? `&category=${CategoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : ''
    // запрос на сервер
    async function PizzasFetch() {
        dispatch(fetchPizzas({
            order,
            sortPut,
            category,
            search,
            currentPage
        }))
        window.scrollTo(0, 0)
    }
    // если есть URL парсим обьект, передаем в стейт, даем запрос на сервер 
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setParams({
                ...params,
                sort: list.find((el) => el.sortProperty === params.sortProperty)
            }))
        }
        isSearch.current = true // говорим, что диспатч выполнил свою работу
    }, [])

    //если не было запроса по втановленому URL ( так как выше функция не исполнилась и не изменила на true)
    React.useEffect(() => {
        window.scrollBy(0, 0)
        // выполняется толкьо после смены isSearch.current = true 
        //  если нет URL вставленого, то отправляем запрос по дефолту с инишелСтейт
        if (!isSearch.current) {
            PizzasFetch()
        }
        isSearch.current = false
        // я сделал по своему так: у меня по другому не работает> оставлю на всякий 
        // если нет URL вставленого, то отправляем запрос по дефолту с инишелСтейт
        if (window.location.search === '') {
            PizzasFetch()
        }

    }, [CategoryId, sort, currentPage, searchValue])
    // если второй и более рендеринг - вставляем URL прийдящий с state
    React.useEffect(() => {
        if (isMounter.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                CategoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounter.current = true
    }, [CategoryId, sort, currentPage])

    function setСategories(i) {
        dispatch(setCategoryId(i))
    } // или сразу можно передать в пропсы этот кол бек 

    function onChangeCurrent(number) {
        dispatch(setCurrentPage(number))
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
                    {message === 'Пиц не найдено' ? <div> пиц нету уходи / message: {message} </div> :
                        status === 'error' ?
                            <NoContent /> : status === 'pending' ? SkeletonArr : Pizzas}
                </div>
            </div>
            <Pagination currentPage={currentPage} onChangeCurrent={onChangeCurrent} />
        </div>
    )
}

export default Home