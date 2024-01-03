import { createSlice } from "@reduxjs/toolkit";

const initState = {
    categories: [
        {
            title: 'All',
            id: 0,
            values: [
                {
                    title: 'All',
                    id: 'all'
                }
            ]
        },
        {
            title: 'Iphone & mac',
            id: 1,
            values: []
        },
        {
            title: 'Wireless',
            id: 2,
            values: []
        },
        {
            title: 'Other',
            id: 3,
            values: []
        }
    ],
    iphoneAndMac: ["Iphone", 'Ipad', 'Mac'],
    wireless: ["Airpod", "Watch"],
    other: ["Mouse", "Keyborad", "Other"]
}

const generesSlice = createSlice({
    name: "Generes_slice",
    initialState: initState,
    reducers: {
        mapperElement: (state, action) => {
            let { type, categories } = action.payload;

            switch(type) {
                case 3:
                    state.categories[3].values = categories;
                    break

                case 2:
                    state.categories[2].values = categories;
                    break

                case 1:
                default:
                    state.categories[1].values = categories;
                    break
            }
        }
    }
});

export const { mapperElement } = generesSlice.actions;

export default generesSlice.reducer;