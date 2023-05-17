import { useAccessTokenInfo } from '../../store/slices/userSlice'
import * as S from './style'

function SelectedType({
  setType,
  setCheckItems,
}: {
  setType: (type: string) => void
  setCheckItems: (init: string[]) => void
}) {
  const { user } = useAccessTokenInfo()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
    setCheckItems([])
  }
  return (
    <S.SearchType>
      <label htmlFor="type">검색조건</label>
      <select id="type" onChange={handleChange}>
        <option value="vacation">연차</option>
        {user.userPayload?.role === 'ADMIN' ? <option value="duty">당직</option> : ''}
      </select>
    </S.SearchType>
  )
}

export default SelectedType
