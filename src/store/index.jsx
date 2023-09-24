import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./store.auth";
import CartSlice from "./store.cart";
import paginationSlice from "./store.pagination";
import PopupSlice from "./store.popup";
import SocketSlice from "./store.socket";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        cart: CartSlice,
        pagination: paginationSlice,
        popup: PopupSlice,
        socket: SocketSlice
    }
})

export default store;