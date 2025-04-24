import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        carts: {},
        order: {}
    }, 
    reducers: {
        startCart: (state) => {
            state.carts = {}
        },
        listCart: (state, action) => {
            state.carts = action.payload
        },
        infoOrder: (state, action) => {
            state.order = action.payload
        }
    }
})

export const { listCart, infoOrder, startCart } = cartSlice.actions