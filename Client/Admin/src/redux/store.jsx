import { configureStore } from '@reduxjs/toolkit'
import { userSlicer } from './reducer/userSlicer';
import { orderSlicer } from './reducer/orderSlice';

const store = configureStore({
    reducer: {
        User: userSlicer.reducer,
        Order: orderSlicer.reducer
    }
})

export default store;