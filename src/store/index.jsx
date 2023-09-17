import { configureStore } from "@reduxjs/toolkit";
import StoreAuth from "./store.auth";
import Cart from "./store.cart";
import Http from "./store-http";
import Messenger from "./store-messenger";
import Pagination from "./store-pagination";
import PopupSlice from "./store.popup";
import SocketSlice from "./store.socket";

const store = configureStore({
    reducer: {
        auth: StoreAuth,
        cart: Cart,
        http: Http,
        messenger: Messenger,
        pagination: Pagination,
        popup: PopupSlice,
        socket: SocketSlice
    }
})

export default store;