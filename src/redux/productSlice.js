import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddProduct: false,
  prodData: {},
  isEditProduct: false,
  isDelete: false,
  categoryList: [],
  steps: 0,
  address: {},
  commerceQuantity: 0,
  orderedDetails: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productAddtion: (state, action) => {
      state.isAddProduct = action.payload;
    },
    productDetails: (state, action) => {
      state.prodData = action.payload;
    },

    productEdit: (state, action) => {
      state.isEditProduct = action.payload;
    },

    productDelete: (state, action) => {
      state.isDelete = action.payload;
    },
    getCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },

    getSteps: (state, action) => {
      state.steps = action.payload;
    },

    getAddress: (state, action) => {
      state.address = action.payload;
    },

    getQuantity: (state, action) => {
      state.commerceQuantity = action.payload;
    },

    getOrderedDetails: (state, action) => {
      state.orderedDetails = action.payload;
    },
  },
});

export const {
  productAddtion,
  productDetails,
  productEdit,
  productDelete,
  getCategoryList,
  getSteps,
  getAddress,
  getQuantity,
  getOrderedDetails,
} = productSlice.actions;

export default productSlice.reducer;
