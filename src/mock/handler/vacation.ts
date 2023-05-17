import { rest } from 'msw'

export const vacationHandler = [
  rest.get('/api/v1/vacation/detail/:id', (_, res, ctx) => {
    // const parmas = req.params

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.get('/api/v1/vacation/delete/:id', (_, res, ctx) => {
    // const parmas = req.params

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.get('/api/v1/vacation/list', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: [
          {
            id: 1,
            start: '2023-05-11',
            end: '2023-05-31',
            memberName: '김독자',
            status: 'WAITING',
            createdAt: '2023-05-15T07:59:17.636Z',
          },
          {
            id: 2,
            start: '2023-05-01',
            end: '2023-05-01',
            memberName: '김사랑',
            status: 'OK',
            createdAt: '2023-05-01T07:59:17.636Z',
          },
          {
            id: 3,
            start: '2023-04-05',
            end: '2023-04-10',
            memberName: '김사랑',
            status: 'WAITING',
            createdAt: '2023-04-10T07:59:17.636Z',
          },
        ],
      }),
    )
  }),
  rest.post('/api/v1/vacation/save', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.post('/api/v1/vacation/modify/:id', async (_, res, ctx) => {
    // const parmas = req.params

    // const body = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
  rest.post('/api/v1/vacation/ok/:id', async (_, res, ctx) => {
    // const accessToken = req.headers.get('Authorization')?.split(' ')[1]

    // const parmas = req.params

    // const body = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '',
        data: true,
      }),
    )
  }),
]
