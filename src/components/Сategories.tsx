import React from "react";

type CategoriesProps = {
    value: number,
    onClickCategories: (ind: number) => void
}


const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategories }) => {

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
})

export default Categories