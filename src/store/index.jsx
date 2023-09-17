import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./store.auth";
import CartSlice from "./store.cart";
import PopupSlice from "./store.popup";
import SocketSlice from "./store.socket";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        cart: CartSlice,
        popup: PopupSlice,
        socket: SocketSlice
    }
})

export default store;