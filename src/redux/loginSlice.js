import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  signInData:{},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginData: (state, action)=>{
        state.isLogin = action.payload
    },
    loginGetData: (state, action)=>{
        state.signInData =action.payload
    }
  },
})

export const { isLoginData, loginGetData } = loginSlice.actions

export default loginSlice.reducer