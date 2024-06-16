import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/slice/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})