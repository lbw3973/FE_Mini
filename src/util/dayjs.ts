import dayjs from 'dayjs'
import ko from 'dayjs/locale/ko'

// @ts-ignore
// eslint-disable-next-line
const locales = {
  ko,
}

const getDayjsInstance = () => {
  return dayjs
}

dayjs.locale('ko')

export const dayjsInstance = getDayjsInstance()
