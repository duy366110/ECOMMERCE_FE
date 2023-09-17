import { createSlice } from "@reduxjs/toolkit";

const initStore = {
    loader: false,
    error: {
        status: false,
        message: ''
    }
}

const store = createSlice({
    name: 'Http',
    initialState: initStore,
    reducers: {
        
        // Phương thức loader sẽ áp dụng khi có hành động request đến server.
        httpLoader:(state, action) => {
            state.loader = action.payload.loader;
            state.error.status = action.payload.error.status;
            state.error.message = action.payload.error.message;
        }
    }
})

export const {httpLoader} = store.actions;
export default store.reducer;