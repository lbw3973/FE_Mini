import { User } from '../user'

export interface LoginRequestDto extends Pick<User, 'username'> {
  password: string
}
