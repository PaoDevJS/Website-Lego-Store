import { createSlice } from '@reduxjs/toolkit'

export const userSlicer = createSlice({
    name: "user",
    initialState: {
        currentUser: false,
        user: [],
        token: null
    },
    reducers: {
        errorUser: (state) => {
            state.currentUser = false
            state.user = {},
            state.token = null
        },
        successUser: (state, action) => {
            state.currentUser = true
            state.user = action.payload.user,
            state.token = action.payload.token
        }
    }
})

export const { errorUser, successUser } = userSlicer.actions