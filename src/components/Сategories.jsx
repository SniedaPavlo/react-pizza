import React from "react";

function Categories() {
    const [activeIndex, setIndex] = React.useState(0)
    let titleArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    function setIndexFun(index) {
        setIndex(index)
    }
    return (
        <div className="categories">
            <ul>
                {titleArr.map((el, ind) => {
                    return <li key={el} onClick={() => setIndexFun(ind)} className={activeIndex === ind ? 'active' : ''}> {el} </li>
                })}
            </ul>
        </div>
    )
}

export default Categories