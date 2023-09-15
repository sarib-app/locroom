import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const appSlice = createSlice({
  name: '$auth',

  initialState: {
    token: null,
    user: null,
  },

  reducers: {
    token: (state, {payload}) => {
      state.token = payload.token
      state.user = {id: payload.userId}
      if (payload?.token && payload?.userId) {
        AsyncStorage.setItem('token', payload.token)
        AsyncStorage.setItem('userId', payload.userId)
      } else {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('userId')
      }
    },
    user: (state, {payload}) => {
      state.user = payload
    },
    logout: (state, {payload}) => {
      state.token = null
      state.user = null
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('userId')
    }
  },
})

export const get = {
  
}

export default {
  reducer: appSlice.reducer,
  set: appSlice.actions,
  get,
}