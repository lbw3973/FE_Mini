import { SetStateAction } from 'react'
import { UserEntity } from '../../types/user'
import * as S from './style'

interface SearchedUserProps {
  users?: UserEntity[]
  ModalHandler: React.Dispatch<React.SetStateAction<boolean>>
  setUserData: React.Dispatch<SetStateAction<UserEntity | undefined>>
}

function SearchedUserTable({ users, ModalHandler, setUserData }: SearchedUserProps) {
  const openModal = (user: UserEntity) => {
    ModalHandler(true)
    setUserData(user)
  }
  return (
    <>
      <colgroup>
        <col width="13%" />
        <col width="13%" />
        <col width="13%" />
        <col width="13%" />
        <col width="13%" />
        <col width="13%" />
      </colgroup>
      <S.Thead>
        <tr>
          <th className="name">이름</th>
          <th className="department">부서</th>
          <th className="position">직급</th>
          <th className="email">이메일</th>
          <th className="role">권한</th>
          <th className="edit"></th>
        </tr>
      </S.Thead>
      <S.Tbody>
        {users ? (
          users.length === 0 ? (
            <tr>
              <td colSpan={6} className="message">
                검색결과가 없습니다
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.username}>
                <td className="name">{user.name}</td>
                <td className="department">{user.departmentName}</td>
                <td className="position">{user.positionName}</td>
                <td className="email">{user.email}</td>
                <td className="role">{user.role}</td>
                <td className="edit-btn" onClick={() => openModal(user)}>
                  조회/수정
                </td>
              </tr>
            ))
          )
        ) : (
          <tr>
            <td colSpan={6} className="message">
              유저를 검색해주세요.
            </td>
          </tr>
        )}
      </S.Tbody>
    </>
  )
}

export default SearchedUserTable
