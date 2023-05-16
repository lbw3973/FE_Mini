import { Outlet } from 'react-router-dom'
import NoticeForm from '../components/NoticeForm'
import { MdLockPerson } from 'react-icons/md'
import { useAccessTokenInfo } from '../store/slices/userSlice'

function ProtectedRouter() {
  const { user } = useAccessTokenInfo()

  return !user.userPayload ? (
    <NoticeForm
      noticeType="warn"
      noticeIcon={<MdLockPerson />}
      title="Unauthorized"
      content="로그인이 필요한 페이지입니다"
    />
  ) : (
    <Outlet />
  )
}

export default ProtectedRouter
