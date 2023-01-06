import React from "react";
import s from './NotFoundBloc.module.scss'

function NotFoundBlock() {
    return (
        <div className={s.root} >
            <span className={s.smile}> 😔 </span>
            <br />
            <h1> Нічого не найдено </h1>
            <span className={s.text}>Нажаль у нас немає цієї сторінки</span>
            <br />
            <button>назад</button>
        </div>
    )
}

export default NotFoundBlock