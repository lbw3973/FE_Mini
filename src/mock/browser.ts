import { setupWorker } from 'msw'
import { handler } from './handler'
import { initMockUser } from './db'

initMockUser()

export const worker = () => {
  return setupWorker(...handler)
}
