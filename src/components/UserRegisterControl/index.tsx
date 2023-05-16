import { useState } from 'react'
import UserRegister from '../UserRegister'
import * as S from './style'
import AcceptButtons from '../AcceptButtons'
import { useAcceptSignup } from '../../hooks/useAcceptSignup'
import { useGetSignUp } from '../../hooks/useGetSignUp'

function UserRegisterControl() {
  const AcceptFunc = useAcceptSignup(true)
  const RejectFunc = useAcceptSignup(false)
  const deActivativeUser = useGetSignUp()
  console.log(deActivativeUser)
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
      deActivativeUser.signup?.data.content.forEach((item) => idArray.push(item.username))
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
            checked={
              deActivativeUser.signup?.data.total !== 0
                ? checkItems.length === deActivativeUser.signup?.data.total
                  ? true
                  : false
                : false
            }
          />
          전체 선택
        </S.Label>
        <AcceptButtons
          checkItems={checkItems}
          PositiveMsg="승인"
          NegativeMsg="거부"
          acceptFunc={AcceptFunc}
          rejectFunc={RejectFunc}
        />
      </div>
      <S.Container>
        {deActivativeUser.signup?.data.total !== 0 ? (
          deActivativeUser.signup?.data.content.map((user) => (
            <UserRegister
              key={user.employeeNumber}
              user={user}
              checkItems={checkItems}
              checkItemHandler={checkedItemHandler}
            />
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>신청내역이 없습니다.</div>
        )}
      </S.Container>
    </>
  )
}

export default UserRegisterControl
