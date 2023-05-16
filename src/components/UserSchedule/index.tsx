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
  }, [checkItems])

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name={`select-${user.id}`}
          checked={isClicked}
          value={user.id}
          onChange={(e) => onCheck(e)}
        />
      </td>
      <td>{user.memberName}</td>
      <td>{user.id}</td>
      <td>{user.departmentName}</td>
      <td>{user.positionName}</td>
      <td>{type === 'vacation' ? user.start : user.day}</td>
      {type === 'vacation' ? <td>{user.end}</td> : null}
    </tr>
  )
}

export default UserSchedule
