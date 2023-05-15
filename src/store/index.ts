import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  user: userReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
