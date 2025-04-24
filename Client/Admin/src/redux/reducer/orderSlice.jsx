import { createSlice } from "@reduxjs/toolkit";

export const orderSlicer = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isDetailOrder: {
      isOpen: false,
      item: "",
    },
    isUpdateOrder: {
      isOpen: false,
      orderId: "",
    },
  },
  reducers: {
    listOrders: (state, action) => {
      state.orders = action.payload;
    },
    detailOrder: (state, action) => {
      state.isDetailOrder.isOpen = action.payload.open;
      state.isDetailOrder.item = action.payload.item;
    },
    updateOrder: (state, action) => {
      console.log("payload >>", action.payload);
      state.isUpdateOrder.isOpen = action.payload.open;
      state.isUpdateOrder.orderId = action.payload.item;
    },
  },
});

export const { listOrders, detailOrder, updateOrder } = orderSlicer.actions;
