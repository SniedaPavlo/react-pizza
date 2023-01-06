import React from 'react'
import s from './NoContent.module.scss'

function NoContent() {
    return (
        <div className={s.wrapper} >
            <p className={s.title}>Ничего не найдено 😔 </p>
            <p className={s.subTitle}>Приношу извинения, если будете заказывать SNIEDA пиццу, тогда при предоставлении скриншота этой ошибки 1% скидки.
                А что ты хотел? Это SNIEDA
            </p>
        </div>
    )
}

export default NoContent