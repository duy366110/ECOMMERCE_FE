import { createSlice } from "@reduxjs/toolkit";

const initStore = {
    currentPage: 0,
    minPage: 0,
    maxPage: 0,
    pageItems: 5,
    itemsStartList: 0,
    quantityItem: [],
    buttons: {
        previous: false,
        next: true
    }
}

const store = createSlice({
    name: 'Pagination',
    initialState: initStore,
    reducers: {

        // Phương thức thực hiện tăng 1 để tiến lên trang tiếp theo.
        next: (state) => {
            // Nếu trang hiện bằng trang cuối cùng sẽ không tăng thêm nữa.
            state.currentPage += (state.currentPage === state.maxPage) ? 0 : 1;
            state.itemsStartList = ((Number(state.currentPage) + 1) - 1) * state.pageItems;

        },

        // Phương thức thực hiện giảm 1 trang hiện tại để quay về trang trước.
        previous: (state) => {
            state.currentPage = state.currentPage - 1;
            state.itemsStartList = ((Number(state.currentPage) + 1) - 1) * state.pageItems;

        },

        // Phương thức thục hiện tính các phần tử cần thiết phân trang.
        getTotalItem: (state, action) => {
            let totalItems = action.payload.totalItems;

            // Dựa vào tổng số sản phẩm tính ra số trang sẽ có VD: Math.celi(8 / 5) = 2 => trang.
            state.quantityItem = Array.from({length: Math.ceil(totalItems / state.pageItems)}, (elm, index) => index);

            // Lấy ra trang cuối cùng [0, 1] => tương đưng 2 trang trang cuối là (2 - 1) = 1.
            state.maxPage = (Math.ceil(totalItems / state.pageItems) - 1);

        },

        // Dãy các item ở giữa 2 button (previous) và (next).
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload.page;

            /**
             * Công thức phân trang ( Trang hiện tại  - 1) * (số item muốn hiện trong trang).
             * VD 1: ta có 2 trang - trang đầu tiên là 0, tiếp theo là 1 được loop ra từ array và số item trên 1 trang là 5.
             *    ((0 + 1) - 1) * 5 = 0 - vị trí bắt dầu query => limit(0, 5)
             *    ((1 + 1) - 1) * 5 = 5 - vị trí bắt dầu query => limit(5, 5)
             * 
             * 
             * * VD 2: ta có 2 trang - trang đầu tiên là 1, tiếp theo là 2 được loop ra từ array và số item trên 1 trang là 5.
             *    (1 - 1) * 5 = 0 - vị trí bắt dầu query => limit(0, 5)
             *    (2 - 1) * 5 = 5 - vị trí bắt dầu query => limit(5, 5)
            */
            state.itemsStartList = ((Number(action.payload.page) + 1) - 1) * state.pageItems;
        }
    }
})

export const { next, previous, getTotalItem, setCurrentPage } = store.actions;

export default store.reducer;