import { rest } from 'msw'
import { API_URL } from '../../api/constants'
import { jwtDecode } from '../../util/jwt'
import { mockUserList } from '../db'
import { removeCookie } from '../../util'
import { ApiResponse } from '../../types/response'

interface Pagination {
  textFilter?: 'EMAIL' | 'POSITION' | 'NAME' | 'DEPARTMENT' | 'ALL'
  keyword?: string | null
  page?: number | null
  size?: number | null
}

export const userHandler = [
  rest.get(API_URL.v1.search, (req, res, ctx) => {
    // [TODO]
    const query = req.url.searchParams

    const text = query.get('text') as Pagination['textFilter']
    const keyword = query.get('keyword')
    const page = query.get('page')
    const size = query.get('size')

    const user = mockUserList

    const pagination = ({ textFilter = 'ALL', keyword = '', page = 0, size = 10 }: Pagination = {}) => {
      switch (textFilter) {
        case 'EMAIL':
          return
        case 'POSITION':
          return
        case 'NAME':
          return
        case 'DEPARTMENT':
          return
        case 'ALL':
          return
        default:
          return
      }
    }

    const responsePage = pagination({ textFilter: text, keyword, page: Number(page), size: Number(size) })

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.get(API_URL.v1.getUserDetail, (req, res, ctx) => {
    const accessToken = req.cookies?.accessToken

    const decoded = jwtDecode(accessToken)

    if (!accessToken || !decoded) {
      return res(ctx.status(401), ctx.json({ status: 401, message: 'token is null or too short', data: false }))
    }

    const user = mockUserList.find((user) => user.username === decoded?.username)

    if (!user) return res(ctx.status(404), ctx.json({ status: 404, message: 'fail', data: false }))

    const { password, ...userData } = user

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
        data: {
          ...userData,
        },
      }),
    )
  }),
  rest.post(API_URL.v1.signup, async (req, res, ctx) => {
    const body = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.post(API_URL.v1.userModify, async (req, res, ctx) => {
    const body = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
        data: true,
      }),
    )
  }),
  rest.get(API_URL.v1.signup, async (req, res, ctx) => {
    const contentType = req.headers.get('Content-Type')

    return res(
      ctx.status(200),
      ctx.json({
        status: 201,
        message: 'success',
        data: true,
      }),
    )
  }),
  rest.get(API_URL.v1.usernameCheck, (req, res, ctx) => {
    const userList = mockUserList

    const usernameQuery = req.url.searchParams.get('username')

    const isExistUsername = userList.some((user) => user.username === usernameQuery)

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: 'success',
        data: isExistUsername ? true : false,
      }),
    )
  }),
  rest.post(API_URL.v1.tempImageUpload, async (req, res, ctx) => {
    if (!req.headers.get('Content-Type')?.includes('multipart/form-data'))
      return res(ctx.status(400), ctx.json({ status: 400, message: '', data: false }))

    const body = req.body as { fileNames: File }

    return res(
      ctx.status(200),
      ctx.json<ApiResponse<string>>({
        status: 200,
        message: 'success',
        data: body.fileNames.name,
      }),
    )
  }),
]
