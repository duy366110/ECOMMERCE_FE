import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: "all",
    itemPage: 1,
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
            state.type = action.payload.type;
            if(action.payload.amount) {
                state.elemtItemsPagination = Math.ceil(action.payload.amount / state.itemPage);
                state.amountProductOfType = action.payload.amount;
            }
        },
        updateCurrentPage: (state, action) => {
            let { page } = action.payload;
            state.currentPage = page;
        }
    }
});

export const { loaderInforSearch, updateTypeSearch, updateCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;