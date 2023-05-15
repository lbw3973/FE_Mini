import { useState } from 'react'
import { UserEntity, UserRole } from '../../types/user'
import { useTheme } from '@emotion/react'
import Button from '../Button'
import * as S from './style'
import { useMutation } from '@tanstack/react-query'

interface EditUserProps {
  userData: UserEntity | undefined
}

interface RoleMutateKey {
  username: string
  role: string
}

function EditUserInfo({ userData }: EditUserProps) {
  const theme = useTheme()
  const [input, setInput] = useState({ ...userData })
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [role, setRole] = useState(userData?.role ?? 'STAFF')

  const { mutate: infoEditMutate } = useMutation(async () => {
    const res = await fetch('api가 없음...수정요청ㅜㅜ')
    return res
  })

  const { mutate: roleEditMutate } = useMutation(async (data: RoleMutateKey) => {
    // const res = await fetch('/api/v1/member/admin/role/modify', data)
    // return res
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(input)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const RoleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const userRole: UserRole = target.id as UserRole
    setRole(userRole)
  }

  const userDataEdit = () => {
    infoEditMutate() // 요청데이터 명세서 정리필요
  }
  const userRoleEdit = () => {
    if (role && userData) {
      roleEditMutate({ username: userData?.username, role: role })
    }
  }

  return (
    <S.EditUserContainer>
      <div className="fixedData">
        <img src="/src/assets/man.png" alt="profile" />
        <p className="name">{userData?.name}</p>
        <span className="username">({userData?.username})</span>
      </div>
      <form className="edit-user-form">
        <div className="inputs">
          <label htmlFor="email">이메일</label>
          <input
            value={input.email}
            onChange={onChange}
            id="email"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
          />

          <label htmlFor="phoneNumber">연락처</label>
          <input
            value={input.phoneNumber}
            onChange={onChange}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="연락처을 입력해주세요"
          />

          <label htmlFor="employeeNumber">사번</label>
          <input
            value={input.employeeNumber}
            onChange={onChange}
            id="employeeNumber"
            name="employeeNumber"
            type="text"
            placeholder="사번을 입력해주세요"
          />

          <label htmlFor="joiningDay">입사</label>
          <input
            value={input.joiningDay}
            onChange={onChange}
            id="joiningDay"
            name="joiningDay"
            type="date"
            placeholder="입사일을 입력해주세요"
          />

          <label htmlFor="department">부서</label>
          <select name="department" id="department" value={input.departmentName}>
            <option value="인사">인사</option>
            <option value="영업">영업</option>
            <option value="개발">개발</option>
            <option value="마케팅">마케팅</option>
          </select>

          <label htmlFor="positionName">직급</label>
          <select name="department" id="department" value={input.positionName}>
            <option value="사원">사원</option>
            <option value="대리">대리</option>
            <option value="과장">과장</option>
            <option value="차장">차장</option>
            <option value="부장">부장</option>
          </select>
        </div>
        <Button bg={theme.app.palette.green1} fontcolor={theme.app.palette.white} onClick={() => userDataEdit()}>
          수정
        </Button>
      </form>
      <div className="edit-role">
        <div className="editor-toggle">
          <p onClick={() => setEditRoleOpen((prev) => !prev)}>
            <span className="icon">{editRoleOpen ? '▲' : '▼'}</span> 권한설정
          </p>
          <span className="warn">
            관리자 권한을 가진 사용자는 모든 정보를 조회 / 수정 할 수 있습니다. 설정 시 주의가 필요합니다.
          </span>
        </div>
        {editRoleOpen && (
          <>
            {/* <div className="now-role">
              <table>
                <tr>
                  <th>영업팀장</th>
                  <th>개발팀장</th>
                  <th>마케팅팀장</th>
                  <th>인사팀장(관리자)</th>
                </tr>
                <tr>
                  <td>오대성</td>
                  <td>이혜원</td>
                  <td>이병욱</td>
                  <td>정석화</td>
                </tr>
              </table>
            </div> */}
            <form className="selet-role">
              <div>
                <input
                  type="radio"
                  name="role"
                  id="STAFF"
                  checked={role === UserRole['STAFF']}
                  onClick={(e) => RoleChange(e)}
                />
                <label htmlFor="STAFF">일반</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  id="ADMIN"
                  checked={role === UserRole['ADMIN']}
                  onClick={(e) => RoleChange(e)}
                />
                <label htmlFor="ADMIN">팀장</label>
              </div>
              <Button bg={theme.app.palette.orange} fontcolor={theme.app.palette.white} onClick={() => userRoleEdit()}>
                권한수정
              </Button>
            </form>
          </>
        )}
      </div>
    </S.EditUserContainer>
  )
}

export default EditUserInfo
