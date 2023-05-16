import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Link, Outlet } from 'react-router-dom'
import { GrHomeRounded, GrUserAdmin } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import NestedNav from './nestedNav'
import UserArea from '../userArea'
import * as S from './style'
import { UserActionPayload, setUser, useAccessTokenInfo } from '../../store/slices/userSlice'
import { getCookie } from '../../util'
import { jwtDecode } from '../../util/jwt'

function Layout() {
  const { user, dispatch } = useAccessTokenInfo()

  const accessToken = getCookie('accessToken')

  if (accessToken && !user.userPayload) {
    dispatch(setUser(jwtDecode(accessToken) as UserActionPayload))
  }

  return (
    <S.Grid>
      <S.Header>
        <Link to="/">
          <Logo />
        </Link>
        <UserArea user={user.userPayload} />
      </S.Header>
      <S.Nav>
        <S.NavGroup>
          <S.NavItem className={({ isActive }) => (isActive ? 'active' : '')} to="/">
            <GrHomeRounded />
            Home
          </S.NavItem>
          <NestedNav
            mainTitle="user"
            mainIcon={<AiOutlineUser />}
            menuInfoList={[
              { title: '내 정보 수정', to: '/user/mypage' },
              { title: '내 연차/당직 관리', to: '/user/vacation' },
            ]}
          />
          {user.userPayload?.role === 'ADMIN' ? (
            <>
              <NestedNav
                mainTitle="admin"
                mainIcon={<GrUserAdmin />}
                menuInfoList={[
                  { title: '연차/당직 신청내역', to: '/admin/vacation' },
                  { title: '회원가입 신청내역', to: '/admin/signup' },
                  { title: '유저정보 관리', to: '/admin/user' },
                  { title: '직급 관리', to: '/admin/position' },
                  { title: '부서 관리', to: '/admin/department' },
                ]}
              />
            </>
          ) : user.userPayload?.role === 'LEADER' ? (
            <>
              <NestedNav
                mainTitle="admin"
                mainIcon={<GrUserAdmin />}
                menuInfoList={[
                  { title: '연차/당직 신청내역', to: '/admin/vacation' },
                  { title: '회원가입 신청내역', to: '/admin/signup' },
                ]}
              />
            </>
          ) : (
            <></>
          )}
        </S.NavGroup>
        {user?.userPayload ? (
          <S.NavItem to="/logout">
            <MdLogout /> Logout
          </S.NavItem>
        ) : null}
      </S.Nav>
      <S.Page id="page">
        <Outlet />
      </S.Page>
    </S.Grid>
  )
}

export default Layout
