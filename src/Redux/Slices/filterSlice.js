import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    CategoryId: 0,
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
        }
    }
})

export const { setCategoryId, setSort } = filterSlice.actions
export default filterSlice.reducer
