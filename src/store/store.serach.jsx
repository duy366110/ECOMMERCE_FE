import { createSlice } from "@reduxjs/toolkit";

const initState = {
    type: "all",
    itemPage: 5,
    elemtItemsPagination: 0,
    currentPage: 0
}

const searchSlice = createSlice({
    name: "Search_slice",
    initialState: initState,
    reducers: {
        
    }
});

export default searchSlice.reducer;