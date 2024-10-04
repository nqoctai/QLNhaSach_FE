import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
/**
 *  carts = [
    { quantity: 1, _id: 'abc',  detail: { _id: 'abc', name: 'def'}},
    { quantity: 1, _id: '123',  detail: { _id: '123', name: '456'}},
  ]
 * 
 */
const initialState = {
    carts: [] // thông tin cart
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            } else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            //update redux
            state.carts = carts;
            message.success("Sản phẩm đã được thêm vào Giỏ hàng")
        },

        doUpdateCartAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            } else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            //update redux
            state.carts = carts;
        },

        doDeleteItemCartAction: (state, action) => {
            state.carts = state.carts.filter(c => c._id !== action.payload._id);
        }

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {

    },
});

export const { doAddBookAction, doUpdateCartAction, doDeleteItemCartAction } = orderSlice.actions;


export default orderSlice.reducer;

