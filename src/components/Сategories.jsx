import React from "react";

function Categories({ value, onClickCategories }) {

    let titleArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {titleArr.map((categoriName, ind) => {
                    return (
                        <li
                            key={categoriName}
                            onClick={() => onClickCategories(ind)}
                            className={value === ind ? 'active' : ''}>
                            {categoriName}
                        </li>)
                })}
            </ul>
        </div>
    )
}

export default Categories