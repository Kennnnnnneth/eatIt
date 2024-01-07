import {
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'

//create, read, update, delete

const cartAdapter = createEntityAdapter({
    // Keep the "all IDs" array sorted based on order id
})
const cartSelector = cartAdapter.getSelectors(state => state.cart)
const { selectAll, selectById } = cartSelector
const cartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState(),
    reducers: {
        cartAdd: cartAdapter.addOne,
        cartUpdate: cartAdapter.updateOne,
        cartDelete: cartAdapter.removeOne,
        cartRemove: cartAdapter.removeAll,
    },
})

export default cartSlice.reducer
export const { cartAdd, cartUpdate, cartDelete, cartRemove } = cartSlice.actions
export const getCart = selectAll
export const getACart = selectById
