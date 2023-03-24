import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            const { _id, name, desc, price, image, type, favourite , dateTime } = action.payload
            const existingItem = state.find(item => item._id === _id)
            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                const dateTime = new Date(Date.now()).toISOString()
                state.push({ _id, name, desc, price, image, type, favourite, quantity: 1,dateTime:dateTime  });
            }
        },
        remove(state, action) {
            return state.filter((item) => item._id != action.payload)
        },
        clear(){
            return []
        },

        decreaseQuantity(state, action) {
            const { _id } = action.payload
            const existingItem = state.find(item => item._id === _id)
            if (existingItem.quantity === 1) {
                return state.filter((item) => item._id != _id)

            }
            else {
                existingItem.quantity--;
            }
        }
    }
})

export const { add, remove ,clear, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer