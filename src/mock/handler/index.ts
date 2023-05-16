import { userHandler } from './user'
import { vacationHandler } from './vacation'
import { authHandler } from './auth'

export const handler = [...authHandler, ...userHandler, ...vacationHandler]
