import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./redux/loginSlice";
import productReducer from "./redux/productSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
  },
})