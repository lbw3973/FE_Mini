import { ApiResponse } from '../types/response'
import { User } from '../types/user'
import { API_URL } from './constants'
import { instance } from './instance'

export async function getUserDetail() {
  const res = await instance.get(API_URL.v1.getUserDetail)

  return res.data as ApiResponse<User>
}

export async function fetchUser() {
  const res = await instance.get('/api/v1/member/detail')

  return res.data.data
}

export async function modifyMyInfo({ name, email, fileName, phoneNumber, oldPassword, newPassword }: ModifyForm) {
  if (fileName && (fileName?.name || fileName.length >= 1)) {
    const upload = new FormData()

    upload.append('fileNames', fileName[0])

    const { data: uploadFile } = await instance.post(
      '/api/v1/temp/upload',
      {
        fileNames: upload.get('fileNames'),
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    console.log({ uploadFile })

    const { status, data } = await instance.post(
      '/api/v1/member/modify',
      {
        name,
        email,
        oldPassword,
        newPassword,
        phoneNumber,
        fileName: uploadFile.data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    if (status !== 200) {
      throw new Error('')
    }

    return data
  }

  const { status, data } = await instance.post(
    '/api/v1/member/modify',
    {
      name,
      email,
      oldPassword,
      newPassword,
      phoneNumber,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  if (status !== 200) {
    throw new Error('')
  }
  return data
}
