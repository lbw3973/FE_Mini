import { useEffect, useState } from 'react'

interface VacationUser {
  name: string
  employeeNumber: string
  department: string
  position: string
  requestDate: string
}

function UserSchedule({
  user,
  checkItems,
  checkItemHandler,
  type,
}: {
  user: VacationUser
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
    setIsClicked(checkItems.includes(user.employeeNumber))
  }, [checkItems])

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name={`select-${user.employeeNumber}`}
          checked={isClicked}
          value={user.employeeNumber}
          onChange={(e) => onCheck(e)}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.employeeNumber}</td>
      <td>{user.department}</td>
      <td>{user.position}</td>
      <td>{user.requestDate}</td>
    </tr>
  )
}

export default UserSchedule
