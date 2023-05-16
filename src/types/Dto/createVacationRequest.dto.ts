import { Vacation } from '../vacation'

export interface CreateVacationRequestDto extends Pick<Vacation, 'start' | 'end' | 'status'> {
  username: string
}
