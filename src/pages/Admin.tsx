import { Outlet } from 'react-router-dom'
import { UserRole } from '../types/user'
import NoticeForm from '../components/NoticeForm'
import { useAccessTokenInfo } from '../store/slices/userSlice'

function Admin() {
  const { user } = useAccessTokenInfo()

  return user.userPayload ? (
    UserRole[user.userPayload.role] !== UserRole.STAFF ? (
      <Outlet />
    ) : (
      <NoticeForm noticeType="notAllow" title="Access Denied" />
    )
  ) : (
    <></>
  )
}

export default Admin
