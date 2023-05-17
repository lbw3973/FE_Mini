import { UserEntity } from '../user'

export interface SignupRequestDto
  extends Pick<
    UserEntity,
    'username' | 'password' | 'name' | 'email' | 'birthDate' | 'years' | 'departmentName' | 'positionName'
  > {}
