import { useState } from 'react'
import { UserEntity, UserRole } from '../../types/user'
import { useTheme } from '@emotion/react'
import Button from '../Button'
import * as S from './style'
import { useMutation } from '@tanstack/react-query'
import { changeRole, modifyUser } from '../../api/admin'
import { ModifyUserReq, RoleMutateReq } from './../../api/type'
import { useGetPositions } from '../../hooks/useGetPositions'
import { useGetDepartments } from '../../hooks/useGetDepartments'
import { NowSearchProp, SearchType } from '../../pages/UserControl'

interface EditUserProps {
  userData: UserEntity | undefined
  nowSearching: NowSearchProp
  ModalHandler: React.Dispatch<React.SetStateAction<boolean>>
  onSearch: (type: SearchType, input: string) => void
}

function EditUserInfo({ userData, nowSearching, ModalHandler, onSearch }: EditUserProps) {
  const theme = useTheme()
  const [input, setInput] = useState({ ...userData })
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [role, setRole] = useState(userData?.role ?? 'STAFF')

  const positions = useGetPositions()
  const departments = useGetDepartments()

  const { mutate: infoEditMutate } = useMutation((user: ModifyUserReq) => modifyUser(user), {
    onSuccess: () => {
      ModalHandler(false)
      onSearch(nowSearching.type, nowSearching.keyword)
      alert('수정이 완료되었습니다')
    },
  })
  const { mutate: roleEditMutate } = useMutation((role: RoleMutateReq) => changeRole(role), {
    onSuccess: () => {
      ModalHandler(false)
      onSearch(nowSearching.type, nowSearching.keyword)
      alert('수정이 완료되었습니다')
    },
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(userData)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const onInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const RoleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const userRole: UserRole = target.id as UserRole
    setRole(userRole)
  }

  const userDataEdit = () => {
    infoEditMutate({
      username: input.username as string,
      name: input.name as string,
      email: input.email as string,
      phoneNumber: input.phoneNumber as string,
      joiningDay: input.joiningDay as string,
      departmentName: input.departmentName as string,
      positionName: input.positionName as string,
    })
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
          <label htmlFor="name">이름</label>
          <input
            value={input.name}
            onChange={onChange}
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
          />

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

          <label htmlFor="joiningDay">입사일</label>
          <input
            value={input.joiningDay}
            onChange={onChange}
            id="joiningDay"
            name="joiningDay"
            type="date"
            placeholder="입사일을 입력해주세요"
          />

          <label htmlFor="departmentName">부서</label>
          <select name="departmentName" id="departmentName" value={input.departmentName} onChange={onInputChange}>
            {departments?.map((department, idx) => (
              <option value={department.departmentName} key={idx}>
                {department.departmentName}
              </option>
            ))}
          </select>

          <label htmlFor="positionName">직급</label>
          <select name="positionName" id="positionName" value={input.positionName} onChange={onInputChange}>
            {positions?.map((position, idx) => (
              <option value={position.positionName} key={idx}>
                {position.positionName}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <Button bg={theme.app.palette.green1} fontcolor={theme.app.palette.white} onClick={() => userDataEdit()}>
            수정
          </Button>
        </div>
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
                <input type="radio" name="role" id="STAFF" checked={role === 'STAFF'} onClick={(e) => RoleChange(e)} />
                <label htmlFor="STAFF">일반</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  id="LEADER"
                  checked={role === 'LEADER'}
                  onClick={(e) => RoleChange(e)}
                />
                <label htmlFor="LEADER">팀장</label>
              </div>
              <div>
                <input type="radio" name="role" id="ADMIN" checked={role === 'ADMIN'} onClick={(e) => RoleChange(e)} />
                <label htmlFor="ADMIN">관리자</label>
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
