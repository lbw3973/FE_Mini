/* Admin */

export interface ModifyUserReq {
  username: string
  name: string
  email: string
  phoneNumber: string
  joiningDay: string
  departmentName: string
  positionName: string
}

export interface ConfirmRegisterReq {
  username: string
  memberStatus: 'ACTIVATION'
}

export interface SearchUserReq {
  type: string
  keyword: string
  page: number
}

export interface RoleMutateReq {
  username: string
  role: string
}

/* department */

export interface DepartmentRegisterReq {
  departmentName: string
  vacationLimit: number
}

export interface DepartmentEditReq {
  departmentName: string
  vacationLimit: number
  // departmentPersonal: number
}

/* position */

export interface PositionRegisterReq {
  positionName: string
  vacation: number
}

export interface PositionEditReq {
  positionName: string
  vacation: number
}

/* vacation */
export interface VacationData {
  start: string
  end: string
}

export interface DutyData {
  username: string
  day: string
}

/*user info*/
export interface ModifyForm extends Omit<MyInfoFormData, 'currentPassword' | 'checkPassword'> {}

export interface MyInfoFormData {
  fileName?: FileList
  email: string
  name: string
  phoneNumber: string
  oldPassword: string
  newPassword: string
  checkPassword: string
}
