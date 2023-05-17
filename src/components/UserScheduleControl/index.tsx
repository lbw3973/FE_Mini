import { useState } from 'react'
import UserSchedule from '../UserSchedule'
import * as S from './style'
import AcceptButtons from '../AcceptButtons'
import Table from '../Table'
import SelectedType from '../SelectedType'
import { useGetDuty } from '../../hooks/useGetDuty'
import { useAcceptDuty } from '../../hooks/useAcceptDuty'
import { useAcceptVacation } from '../../hooks/useAcceptVacation'
import { useGetVacation } from '../../hooks/useGetVacation'

function UserScheduleControl() {
  const userDuties = useGetDuty()
  const userVacations = useGetVacation()
  console.log('duties', userDuties)
  console.log('vacations', userVacations)
  const [type, setType] = useState('duty')
  const [checkItems, setCheckItems] = useState<string[]>([])
  const AcceptDuty = useAcceptDuty(true)
  const rejectDuty = useAcceptDuty(false)
  const AcceptVacation = useAcceptVacation(true)
  const rejectVacation = useAcceptVacation(false)
  const data = type === 'duty' ? userDuties : userVacations

  const checkedItemHandler = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckItems([...checkItems, id])
    } else {
      setCheckItems(checkItems.filter((el) => el !== id))
    }
  }

  const onCheckAll = (checked: boolean) => {
    if (checked) {
      const idArray: string[] = []
      data.data?.data.content.forEach((item) => idArray.push(item.id))
      setCheckItems(idArray)
    } else {
      setCheckItems([])
    }
  }
  return (
    <>
      <SelectedType setType={setType} />
      <Table>
        <S.Thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="select-all"
                onChange={(e) => onCheckAll(e.target.checked)}
                checked={
                  !data.data?.data.empty
                    ? checkItems.length === data.data?.data.numberOfElements
                      ? true
                      : false
                    : false
                }
              />
            </th>
            <th>이름</th>
            <th>사번</th>
            <th>부서</th>
            <th>직급</th>
            <th>{type === 'vacation' ? '시작일' : '신청 날짜'}</th>
            {type === 'vacation' ? <th>종료일</th> : null}
          </tr>
        </S.Thead>
        <S.Tbody>
          {data.data?.data.empty
            ? ''
            : data.data?.data.content.map((user) => (
                <UserSchedule
                  type={type}
                  key={user.id}
                  user={user}
                  checkItems={checkItems}
                  checkItemHandler={checkedItemHandler}
                />
              ))}
        </S.Tbody>
      </Table>
      <AcceptButtons
        checkItems={checkItems}
        PositiveMsg="승인"
        NegativeMsg="거부"
        acceptFunc={type === 'duty' ? AcceptDuty : AcceptVacation}
        rejectFunc={type === 'duty' ? rejectDuty : rejectVacation}
      />
    </>
  )
}

export default UserScheduleControl
