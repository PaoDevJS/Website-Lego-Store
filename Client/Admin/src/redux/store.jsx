import { configureStore } from '@reduxjs/toolkit'
import { userSlicer } from './reducer/userSlicer';

const store = configureStore({
    reducer: {
        User: userSlicer.reducer
    }
})

export default store;