import * as S from './style'
import IconHuman from '../../assets/man.png'
import { useEffect, useState, useRef } from 'react'
import { DeActivatedContent } from '../../hooks/useGetSignUp'

function UserRegister({
  user,
  checkItems,
  checkItemHandler,
}: {
  user: DeActivatedContent
  checkItems: string[]
  checkItemHandler: (id: string, checked: boolean) => void
}) {
  console.log({ user })
  const ContainerRef = useRef<HTMLInputElement>(null)
  const [isClicked, setIsClicked] = useState(false)

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkItemHandler(e.target.value, e.target.checked)
    setIsClicked(e.target.checked)
  }

  const handleClick = () => {
    if (ContainerRef.current) {
      ContainerRef.current.click()
    }
  }

  useEffect(() => {
    setIsClicked(checkItems.includes(user.username))
  }, [checkItems])

  return (
    <S.Container onClick={handleClick}>
      <input
        type="checkbox"
        name={`select-${user.employeeNumber}`}
        checked={isClicked}
        value={user.username}
        onChange={(e) => onCheck(e)}
        ref={ContainerRef}
      />
      <img src={user?.fileName ?? IconHuman} alt="사용자" />
      <S.UserInfo>
        <div className="userName">{user.name}</div>
        <div className="userEmail">{user.email}</div>
      </S.UserInfo>
      <S.UserDetail>
        <div className="employeeNum">사번 : {user.employeeNumber}</div>
        <div className="department">부서 : {user.departmentName}</div>
        <div className="position">직급 : {user.positionName}</div>
        <div className="joinDate">
          입사일(근속연수): {user.joinDate} ({user.years}년)
        </div>
      </S.UserDetail>
    </S.Container>
  )
}

export default UserRegister

const getYearsOfService = (date: string) => {
  const now = new Date()
  return now.getFullYear() - Number(date.substring(0, 4)) + 1
}
