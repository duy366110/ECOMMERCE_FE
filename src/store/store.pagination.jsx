import { createSlice } from "@reduxjs/toolkit";

const initState = {
    category : [

    ],
    current: {
        type: "all",
        itemPage: 5,
        page: 0
    }
}

const paginationSlice = createSlice({
    name: 'Pagination_slice',
    initialState: initState,
    reducers: {
        loaderPagination: (state, action) => {
            let { infor } = action.payload;
            
            for(let category of infor) {
                state.category.push({title: category.title, amount: category.collections.length});
            }
        }
    }
})

export const { loaderPagination } = paginationSlice.actions;

export default paginationSlice.reducer;