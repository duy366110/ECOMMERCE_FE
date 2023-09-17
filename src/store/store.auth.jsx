import { createSlice } from "@reduxjs/toolkit";

const initState = {
    username: '',
    fullname: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    token: '',
}

const authSlice = createSlice({
    name: 'Auth_slice',
    initialState: initState,
    reducers: {
        authSignin: (state, action) => {
            state.username = action.payload.infor.username;
            state.fullname = action.payload.infor.fullname;
            state.email = action.payload.infor.email;
            state.phone = action.payload.infor.phone;
            state.address = action.payload.infor.address;
            state.role = action.payload.infor.role;
            state.token = action.payload.infor.token;
        },
        authReload: (state, action) => {
            let user = JSON.parse(localStorage.getItem('user'));
            if(user) {
                state.fullname = user.fullname;
                state.email = user.email;
                state.phone = user.phone;
                state.address = user.address;
                state.role = user.role;
                state.token = user.token;
                state.username = user.username;
            }
        },
        authLogout: (state, action) => {
            localStorage.clear();
            state.fullname = '';
            state.email = '';
            state.phone = '';
            state.address = '';
            state.role = '';
            state.token = '';
            state.username = '';
        }
    }
})

export const { authSignin, authReload, authLogout } = authSlice.actions;

export default authSlice.reducer;