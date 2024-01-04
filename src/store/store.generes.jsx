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
    wireless: ["AirPods", "Watch"],
    other: ["Mouse", "Keyborad", "Other"]
}

const generesSlice = createSlice({
    name: "Generes_slice",
    initialState: initState,
    reducers: {
        mapperElement: (state, action) => {
            let { categories } = action.payload;

            for(let type of state.categories) {
                if(type.id === 1) {
                    state.categories[type.id].values = categories.filter((elm) => state.iphoneAndMac.some((type) => type === elm.title));
                }

                if(type.id === 2) {
                    state.categories[type.id].values = categories.filter((elm) => state.wireless.some((type) => type === elm.title));
                }

                if(type.id === 3) {
                    state.categories[type.id].values = categories.filter((elm) => state.other.some((type) => type === elm.title));
                }
            }
        }
    }
});

export const { mapperElement } = generesSlice.actions;

export default generesSlice.reducer;