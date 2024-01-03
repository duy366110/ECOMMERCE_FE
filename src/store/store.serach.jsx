import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: "all",
    itemPage: 5,
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
        }
    }
});

export const { loaderInforSearch } = searchSlice.actions;
export default searchSlice.reducer;