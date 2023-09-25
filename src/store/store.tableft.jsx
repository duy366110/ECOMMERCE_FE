import { createSlice } from "@reduxjs/toolkit";

const initState = {
    status: false
}

const tableftSlice = createSlice({
    name: 'Tableft_slice',
    initialState: initState,
    reducers: {
        toggle: (state, action) => {
            state.status = !state.status;
        }
    }
})

export const { toggle } = tableftSlice.actions;

export default tableftSlice.reducer;