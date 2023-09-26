import { createSlice } from "@reduxjs/toolkit";

const initState = {
    status: false,
    sidecategory: {
        status: false
    }
}

const tableftSlice = createSlice({
    name: 'Tableft_slice',
    initialState: initState,
    reducers: {
        toggle: (state, action) => {
            state.status = !state.status;
        },
        toggleSideCategory: (state, action) => {
            state.sidecategory.status = !state.sidecategory.status;
        }
    }
})

export const { toggle, toggleSideCategory } = tableftSlice.actions;

export default tableftSlice.reducer;