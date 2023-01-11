import React from "react";

type CategoriesProps = {
    value: number,
    onClickCategories: any
}


const Categories: React.FC<CategoriesProps> = ({ value, onClickCategories }) => {

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