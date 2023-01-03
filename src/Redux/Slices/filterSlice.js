import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const { setCategoryId, setSort, setCurrentPage, setParams } = filterSlice.actions
export default filterSlice.reducer
