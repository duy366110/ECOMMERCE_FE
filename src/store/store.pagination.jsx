import { createSlice } from "@reduxjs/toolkit";

const initState = {
    category : [

    ],
    current: {
        type: "all",
        itemPage: 5,
        elemtItemsPagination: 0,
        currentPage: 0
    }
}

const paginationSlice = createSlice({
    name: 'Pagination_slice',
    initialState: initState,
    reducers: {
        loaderPagination: (state, action) => {
            let { infor } = action.payload;
            
            state.category = [];
            for(let category of infor) {
                state.category.push({id: category._id, title: category.title, amount: category.collections.length});
            }
        },
        updateElementToTal: (state, action) => {
            let { amount, type } = action.payload;

            console.log(amount);
            state.current.type = type;
            state.current.elemtItemsPagination = Math.ceil(Number(amount) / state.current.itemPage);
        },
        updateCurrentPage: (state, action) => {
            let { page } = action.payload;

            switch(page) {
                case 'next':
                    if(state.current.currentPage === (state.current.elemtItemsPagination - 1)) {
                        state.current.currentPage = 0;

                    } else {
                        state.current.currentPage += 1;
                    }

                    break

                case 'previous':
                    if(state.current.currentPage === 0) {
                        state.current.currentPage = (state.current.elemtItemsPagination - 1);

                    } else {
                        state.current.currentPage -= 1;
                    }
                    break

                default:
                    state.current.currentPage = Number(page);
                    break
            }
        },
        updateType: (state, action) => {
            let { type } = action.payload;
            let category = state.category.find((elm) => elm.id === type);

            if(category) {
                state.current.type = type;
                state.current.elemtItemsPagination = Math.ceil(Number(category.amount) / state.current.itemPage);
            }
        }
    }
})

export const { loaderPagination, updateElementToTal,  updateCurrentPage, updateType } = paginationSlice.actions;

export default paginationSlice.reducer;