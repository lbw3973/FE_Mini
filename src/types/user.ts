export interface UserEntity {
  username: string
  birthDate: string
  email: string
  password?: string
  employeeNumber: string
  departmentName: string
  positionName: string
  name: string
  joiningDay: string
  years: number
  phoneNumber: string
  fileName?: string
  role: UserRole
  updatedAt: string
}

export interface User {
  username: string
  password?: string
  name: string
  email: string
  role: UserRole
  employeeNumber: string
  phoneNumber: string
  birthDate: string
  joiningDay: string
  years: number
  departmentName: string
  positionName: string
  fileName?: string
}

export interface SearchedUser {
  total: number
  first: boolean
  last: boolean
  content: UserEntity[]
}

export interface UserPayload {
  sub?: string
  iat?: number
  exp?: number
  username: string
  name?: string
  role: keyof typeof UserRole
  departmentName: string
  positionName: string
  fileName?: string
}

export enum UserRole {
  'STAFF' = '일반',
  'LEADER' = '팀장',
  'ADMIN' = '관리자',
}
