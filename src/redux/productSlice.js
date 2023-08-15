import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isAddProduct: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productAddtion: (state, action)=>{
        state.isAddProduct = action.payload
    },
  },
})

export const { productAddtion } = productSlice.actions

export default productSlice.reducer