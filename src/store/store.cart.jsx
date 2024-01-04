import { createSlice } from "@reduxjs/toolkit";

const initStore = {
    cart: [],
    coupon: '',
    total: 0
}

// THỰC HIỆN TÍNH TỔNG GIÁ CỦA MỖI SẢN PHẨM TRONG CART VÀ TỔNG GIÁ TRỊ CỦA CART
function generatorTotalPrice (state, listItem) {
    state.total = listItem.reduce((acc, cartItem) => {
        cartItem.total = parseFloat(cartItem.product.price.$numberDecimal) * Number(cartItem.quantity);
        
        acc += cartItem.total;

        cartItem.total = cartItem.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        state.cart.push(cartItem);

        return acc;
    }, 0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    localStorage.setItem('cart', JSON.stringify(state));
}

const store = createSlice({
    name: "Cart",
    initialState: initStore,
    reducers: {

        // LOAD THÔNG TIN CART CỦA USER
        loadCartInformation: (state, action) => {
            let { user } = action.payload;

            // THỰC HIỆN TÍNH TOTAL PRODUCT VÀ TOTAL CART
            state.cart = [];
            state.total = 0;
            generatorTotalPrice(state, user.cart);
        },

        // THỰC HIỆN RELOAD CART
        cartReload: (state, action) => {
            let cartInfor = localStorage.getItem('cart');

            if(cartInfor) {
                cartInfor = JSON.parse(cartInfor);
                let cartCoupon = localStorage.getItem('coupon');

                state.coupon = cartCoupon;
                localStorage.removeItem('cart');
                generatorTotalPrice(state, cartInfor.cart);
            }
        },

        // THỰC HIỆN CẬP NHẬT THÔNG TIN SẢN PHẨM TRONG CART
        modifiProductInCart: (state, action) => {
            let { product, type } = action.payload;
            let cartInfor = JSON.parse(localStorage.getItem('cart'));
            let cartList = [];

            // XOÁ SẢN PHẨM TRONG DANH SÁCH CART
            if(type === 'remove') {
                cartList = cartInfor.cart.filter((cartItem) => cartItem.product._id !== product);
            }

            // CẬP NHẬT SỐ LƯỢNG SẢN PHẨM ĐƠN TRONG DANH SÁCH SẢN PHẨM
            if((type === 'increase') || (type === 'decrease')) {
                cartList = cartInfor.cart.map((cartItem) => {
                    if(cartItem.product._id === product) {
                        if(type === 'increase') {
                            cartItem.quantity++;
    
                        } else {
                            cartItem.quantity--;
                        }
                    }
                    return cartItem;
                }).filter((cartItem) => cartItem.quantity)
            }

            state.cart = [];
            state.total = 0;

            // THỰC HIỆN TÍNH TOTAL PRODUCT VÀ TOTAL CART
            localStorage.removeItem('cart');
            generatorTotalPrice(state, cartList);
        },

        // THỰC HIỆN THÊM MÃ GIẢM GIÁ
        increaseCoupon: (state, action) => {
            let { coupon } = action.payload;
            state.coupon = coupon;

            localStorage.setItem('coupon', coupon);
        }
    }
})


export const { loadCartInformation, modifiProductInCart, increaseCoupon, cartReload } = store.actions;

export default store.reducer;