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

export const testUser = [
  {
    username: 'lbw',
    name: '이병욱',
    employeeNumber: '2023050401',
    department: '개발2팀',
    position: '사원',
    requestDate: '2023-05-01',
    joinDate: '2022-03-02',
    email: 'lbw@test.com',
  },
  {
    username: 'ods',
    name: '오대성',
    employeeNumber: '2022121101',
    department: '개발1팀',
    position: '대리',
    requestDate: '2023-05-12',
    joinDate: '2019-05-11',
    email: 'ods@test.com',
  },
  {
    username: 'csh',
    name: '조승혜',
    employeeNumber: '2019082801',
    department: '개발1팀',
    position: '과장',
    requestDate: '2023-05-30',
    joinDate: '2017-10-25',
    email: 'csh@test.com',
  },
  {
    username: 'jsh',
    name: '정석화',
    employeeNumber: '2013012801',
    department: '개발본부',
    position: '부장',
    requestDate: '2023-05-15',
    joinDate: '2010-11-02',
    email: 'jsh@test.com',
  },
  {
    username: 'lhw',
    name: '이혜원',
    employeeNumber: '2015030201',
    department: '개발2팀',
    position: '차장',
    requestDate: '2023-05-11',
    joinDate: '2014-08-05',
    email: 'lhw@test.com',
  },
]

function UserScheduleControl() {
  const duty = useGetDuty()
  const vacations = useGetVacation()
  console.log(duty, vacations)
  const [type, setType] = useState('duty')
  const [checkItems, setCheckItems] = useState<string[]>([])
  const AcceptDuty = useAcceptDuty(true)
  const rejectDuty = useAcceptDuty(false)
  const AcceptVacation = useAcceptVacation(true)
  const rejectVacation = useAcceptVacation(false)

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
      testUser.forEach((item) => idArray.push(item.employeeNumber))
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
                checked={checkItems.length === testUser.length ? true : false}
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
          {testUser.map((user) => (
            <UserSchedule
              key={user.employeeNumber}
              type={type}
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
