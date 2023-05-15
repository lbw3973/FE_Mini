import React from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Link, Outlet } from 'react-router-dom'
import { GrHomeRounded, GrUserAdmin } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import NestedNav from './nestedNav'
import UserArea from '../userArea'
import { UserRole } from '../../types/user'
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
          <NestedNav
            mainTitle="admin"
            mainIcon={<GrUserAdmin />}
            menuInfoList={[
              { title: '연차/당직 신청내역보기', to: '/admin/vacation' },
              { title: '회원가입 신청내역보기', to: '/admin/signup' },
              { title: '유저 정보 수정', to: '/admin/user' },
            ]}
            isAuth={!!user?.userPayload && UserRole[user.userPayload.role] === UserRole.ADMIN}
          />
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
