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
        },
        closeSideCategory: (state, action) => {
            state.sidecategory.status = false;
        }
    }
})

export const { toggle, toggleSideCategory, closeSideCategory } = tableftSlice.actions;

export default tableftSlice.reducer;