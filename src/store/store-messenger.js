import { createSlice } from "@reduxjs/toolkit";

const initState = {
    open: false,
}

const store = createSlice({
    name: 'Messenger',
    initialState: initState,
    reducers: {
        // Phương thức truyển đổi trạng thái đóng - mở message.
        toggleMessenger: (state) => {
            state.open = !state.open;
        }
    }
})

export const { toggleMessenger } = store.actions;
export default store.reducer;