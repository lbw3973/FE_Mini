export interface DutyEntity {
  id: number
  memberName: string
  day: string
  status: DutyStatus
  departmentName: string
}

export enum DutyStatus {
  'WAITING',
  'OK',
  'REJECTED',
}
