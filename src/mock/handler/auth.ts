import { rest } from 'msw'
import { API_URL } from '../../api/constants'
import { mockUserList } from '../db'
import { jwtDecode, registerAccessToken, registerRefreshToken, verifyRefreshToken } from '../../util/jwt'

export const authHandler = [
  rest.post(API_URL.v1.login, async (req, res, ctx) => {
    const { username, password } = await req.json()

    if (!(username && password)) {
      return res(
        ctx.status(401),
        ctx.json({
          status: 401,
          message: 'fail',
          data: false,
        }),
      )
    }

    const user = mockUserList.find((user) => user.username === username)

    if (!user)
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: 'fail',
          data: false,
        }),
      )

    const userPayload = {
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentName: user.departmentName,
      positionName: user.positionName,
      fileName: user.fileName,
    }

    const accessToken = await registerAccessToken(userPayload)
    const refreshToken = await registerRefreshToken(userPayload)

    const refreshTokenPayload = jwtDecode(refreshToken)

    return res(
      ctx.status(200),
      ctx.set({ Authorization: `Bearer ${accessToken}` }),
      ctx.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        maxAge: Number(refreshTokenPayload?.exp) - Number(refreshTokenPayload?.iat),
      }),
      ctx.json({
        status: 200,
        message: 'success',
        data: true,
      }),
    )
  }),
  rest.post(API_URL.v1.refresh, async (req, res, ctx) => {
    const accessToken = req.headers.get('Authorization')
    const refreshToken = req.cookies['refreshToken']
    const { payload } = await verifyRefreshToken(refreshToken)

    if (!accessToken) {
      return res(ctx.status(403), ctx.json({ status: 403, message: '', data: false }))
    }
    if (!refreshToken || !payload) {
      return res(ctx.status(403), ctx.json({ status: 403, message: '', data: false }))
    }

    const newAccessToken = await registerAccessToken(payload)

    const newRefreshToken = await registerRefreshToken(payload)
    const newRefreshTokenPayload = jwtDecode(newRefreshToken)

    return res(
      ctx.status(200),
      ctx.set('Authorization', `Bearer ${newAccessToken}`),
      ctx.cookie('refreshToken', newRefreshToken, {
        path: '/',
        httpOnly: true,
        maxAge: Number(newRefreshTokenPayload?.exp) - Number(newRefreshTokenPayload?.iat),
      }),
      ctx.json({ status: 200, message: 'success', data: true }),
    )
  }),
]
