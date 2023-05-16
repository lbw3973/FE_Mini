import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '..'
import { Vacation } from '../../types/vacation'
import { Duty } from '../../types/vacation'

type ModalState = {
  vacationPayload: Partial<Vacation> | null
  dutyPayload: Partial<Duty> | null
}
export type VacationActionPayload = Partial<Vacation> | null
export type DutyActionPayload = Partial<Duty> | null

const initialState: ModalState = {
  vacationPayload: null,
  dutyPayload: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setVacation: (state: ModalState, action: PayloadAction<VacationActionPayload>) => {
      state.vacationPayload = action?.payload ? { ...state.vacationPayload, ...action.payload } : null
    },
    setDuty: (state: ModalState, action: PayloadAction<DutyActionPayload>) => {
      state.dutyPayload = action?.payload ? { ...action.payload } : null
    },
  },
})

export const { setVacation, setDuty } = modalSlice.actions

export function useModalInfo() {
  const modal = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  return {
    modal,
    dispatch,
  }
}

export default modalSlice.reducer
