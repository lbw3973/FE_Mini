import React from 'react'
import Avatar from '@mui/material/Avatar'
import { UserPayload } from '../../types/user'
import { LoginForm } from '../Form'
import * as S from './style'
import { Link } from 'react-router-dom'

interface UserAreaProps {
  user?: UserPayload | null
}

function UserArea({ user }: UserAreaProps) {
  console.log({ user })
  return user ? (
    <S.AvatarWrapper>
      <Avatar alt="user" src={user.fileName ?? '/src/assets/man.png'} />
      <S.UserInfo>
        <div>{user.name}</div>
        <S.DepartmentAndPosition>
          {user.department}팀 ({user.position})
        </S.DepartmentAndPosition>
      </S.UserInfo>
    </S.AvatarWrapper>
  ) : (
    <S.LoginArea>
      <LoginForm />
      <Link to="/signup">
        <S.RegisterButton variant="text">{'Register'.toLowerCase()}</S.RegisterButton>
      </Link>
    </S.LoginArea>
  )
}

export default UserArea
