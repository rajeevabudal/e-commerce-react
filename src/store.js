import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./redux/loginSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer
  },
})