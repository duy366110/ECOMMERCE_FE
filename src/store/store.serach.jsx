import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: "all",
    itemPage: 9,
    elemtItemsPagination: 0,
    currentPage: 0,
    amountProductOfType: 0
}

const searchSlice = createSlice({
    name: "Search_slice",
    initialState: initState,
    reducers: {
        loaderInforSearch: (state, action) => {
            state.amountProductOfType = action.payload.amount;
            state.elemtItemsPagination = Math.ceil(action.payload.amount / state.itemPage);
        },
        updateTypeSearch: (state, action) => {
            console.log(action.payload.type);
            console.log(action.payload.amount);

            state.type = action.payload.type;
            if(action.payload.amount) {
                state.currentPage = 0;
                state.elemtItemsPagination = Math.ceil(action.payload.amount / state.itemPage);
                state.amountProductOfType = action.payload.amount;
            }
        },
        updateCurrentPage: (state, action) => {
            let { page } = action.payload;
            state.currentPage = page;
        },
        previousPage: (state) => {
            if(state.currentPage > 0) {
                state.currentPage--;
            }
        },
        nextPage: (state) => {
            if(state.currentPage < (state.elemtItemsPagination - 1)) {
                state.currentPage++;
            }
        }
    }
});

export const { loaderInforSearch, updateTypeSearch, updateCurrentPage, previousPage, nextPage } = searchSlice.actions;
export default searchSlice.reducer;