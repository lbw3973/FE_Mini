import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import modalReducer from './slices/modalSlice'
export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
