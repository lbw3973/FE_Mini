import { useEffect, useState } from 'react'
import { VacationContent } from '../../hooks/useGetVacation'
import { DutyContent } from '../../hooks/useGetDuty'

function UserSchedule({
  user,
  checkItems,
  checkItemHandler,
  type,
}: {
  user: VacationContent | DutyContent
  checkItems: string[]
  checkItemHandler: (id: string, checked: boolean) => void
  type: string
}) {
  const [isClicked, setIsClicked] = useState(false)

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkItemHandler(e.target.value, e.target.checked)
    setIsClicked(e.target.checked)
  }

  useEffect(() => {
    setIsClicked(checkItems.includes(user.id))
  }, [checkItems]) /* eslint-disable-line */

  return (
    <tr>
      <td>
        <input type="checkbox" name={`select-${user.id}`} value={user.id} onChange={(e) => onCheck(e)} />
      </td>
      <td>{parseStatus(user.status)}</td>
      <td>{user.memberName}</td>
      <td>{user.employeeNumber}</td>
      <td>{user.departmentName}</td>
      <td>{user.positionName}</td>
      <td>{type === 'vacation' ? (user as VacationContent).start : (user as DutyContent).day}</td>
      {type === 'vacation' ? <td>{(user as VacationContent).end}</td> : null}
    </tr>
  )
}

export default UserSchedule

const parseStatus = (status: string) => {
  switch (status) {
    case 'WAITING':
      return '신규'
    case 'UPDATE_WAITING':
      return '수정'
  }
}
