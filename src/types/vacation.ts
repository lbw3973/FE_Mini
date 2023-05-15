export interface Vacation {
  id: number
  memberName: string
  departmentName: string
  start: string
  end: string
  status: VacationStatus
  createdAt?: string
}

export interface Duty {
  id: number
  membername: string
  day: string
  status: VacationStatus
  departmentName: string
  createdAt: string
}

export enum VacationStatus {
  'WAITING' = 'WAITING',
  'OK' = 'OK',
  'REJECTED' = 'REJECTED',
}
