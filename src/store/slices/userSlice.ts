import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '..'
import { UserPayload } from '../../types/user'

type UserState = {
  userPayload: UserPayload | null
}

export type UserActionPayload = UserPayload | null

const initialState: UserState = {
  userPayload: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserActionPayload>) => {
      state.userPayload = action?.payload ? { ...action.payload } : null
    },
  },
})

export const { setUser } = userSlice.actions

export function useAccessTokenInfo() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  return {
    user,
    dispatch,
  }
}

export default userSlice.reducer
