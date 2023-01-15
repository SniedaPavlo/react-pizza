import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SortType = {
    name: string,
    sortProperty: string
}

interface InitialStateInterface {
    searchValue: string,
    CategoryId: number,
    currentPage: number,
    sort: SortType
}

const initialState: InitialStateInterface = {
    searchValue: '',
    CategoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'CategoryId&Sort',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.CategoryId = action.payload
        },
        setSort(state, action: PayloadAction<SortType>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setParams(state, action: PayloadAction<InitialStateInterface>) {
            state.CategoryId = Number(action.payload.CategoryId)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }
})

export const selectFilter = (state: RootState) => state.filterSlice

export const { setCategoryId, setSort, setCurrentPage, setParams, setSearchValue } = filterSlice.actions
export default filterSlice.reducer
