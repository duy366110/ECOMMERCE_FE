import { createSlice } from "@reduxjs/toolkit";

const initState = {
    message: {
        status: false,
        content: ''
    },
    loader: {
        status: false
    },
    chat: {
        status: false
    }
}

const popupSlice = createSlice({
    name: 'Popup_slice',
    initialState: initState,
    reducers: {
        openMessage: (state, action) => {
            let { content } = action.payload;
            state.message.status = true;
            state.message.content = content;
        },
        closeMessage: (state, action) => {
            state.message.status = false;
            state.message.content = '';
        },
        toggleLoader: (state, action) => {
            state.loader.status = !state.loader.status;
        },
        toggleChat: (state, action) => {
            state.chat.status = !state.chat.status;
        }
    }
})

export const { openMessage, closeMessage, toggleLoader, toggleChat } = popupSlice.actions;

export default popupSlice.reducer;