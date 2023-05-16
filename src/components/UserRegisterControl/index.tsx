import { useState } from 'react'
import UserRegister from '../UserRegister'
import { testUser } from '../UserScheduleControl'
import * as S from './style'
import AcceptButtons from '../AcceptButtons'
import { useAcceptSignup } from '../../hooks/useAcceptSignup'
import { useGetSignUp } from '../../hooks/useGetSignUp'

function UserRegisterControl() {
  const AcceptFunc = useAcceptSignup(true)
  const RejectFunc = useAcceptSignup(false)
  const getSignUp = useGetSignUp()
  console.log(getSignUp)
  const [checkItems, setCheckItems] = useState<string[]>([])

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <S.Label>
          <input
            type="checkbox"
            name="select-all"
            onChange={(e) => onCheckAll(e.target.checked)}
            checked={checkItems.length === testUser.length ? true : false}
          />
          전체 선택
        </S.Label>
        <AcceptButtons
          checkItems={checkItems}
          PositiveMsg="승인"
          NegativeMsg="거부"
          acceptFunc={() => AcceptFunc}
          rejectFunc={() => RejectFunc}
        />
      </div>
      <S.Container>
        {testUser.map((user) => (
          <UserRegister
            key={user.employeeNumber}
            user={user}
            checkItems={checkItems}
            checkItemHandler={checkedItemHandler}
          />
        ))}
      </S.Container>
    </>
  )
}

export default UserRegisterControl
