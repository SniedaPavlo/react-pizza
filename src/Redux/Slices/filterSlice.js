import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    CategoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности', sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'CategoryId&Sort',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action) {

            state.CategoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setParams(state, action) {
            state.CategoryId = Number(action.payload.CategoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }



})

export const selectFilter = (state) => state.filterSlice

export const { setCategoryId, setSort, setCurrentPage, setParams, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
