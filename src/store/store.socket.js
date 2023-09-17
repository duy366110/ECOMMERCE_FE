import { createSlice } from "@reduxjs/toolkit";

const initState = {
    socket: null
}

const socketSlice = createSlice({
    name: 'Socket_slice',
    initialState: initState,
    reducers: {
        shareSocket: (state, action) => {
            let { socket } = action.payload;
            state.socket = socket;
        }
    }
})

export const { shareSocket } = socketSlice.actions;

export default socketSlice.reducer;