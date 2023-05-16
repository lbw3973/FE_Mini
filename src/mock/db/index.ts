import { User } from '../../types/user'
import mockUserData from './mockUserData.json'

export const mockUserList: User[] = []

export function initMockUser() {
  // @ts-ignore
  mockUserList.push(...mockUserData)
}
