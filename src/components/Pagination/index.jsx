import React from "react";
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'


function Pagination({ currentPage, onChangeCurrent }) {
    return (

        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={event => {
                // console.log(event)
                onChangeCurrent(event.selected + 1)
            }}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination