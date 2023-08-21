import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 isAddProduct: false,
 prodData: {},
 isEditProduct: false,
 isDelete: false,
 categoryList: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productAddtion: (state, action)=>{
        state.isAddProduct = action.payload
    },
    productDetails: (state, action)=>{
      state.prodData = action.payload
    }, 

    productEdit:(state, action)=>{
      state.isEditProduct = action.payload
    },

    productDelete: (state, action)=>{
      state.isDelete = action.payload
    },
    getCategoryList: (state, action)=>{
      state.categoryList = action.payload
    }
  },
})

export const { productAddtion, productDetails, productEdit, productDelete, getCategoryList } = productSlice.actions

export default productSlice.reducer