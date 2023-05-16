import * as S from './style'

function SelectedType({
  setType,
  setCheckItems,
}: {
  setType: (type: string) => void
  setCheckItems: (init: string[]) => void
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
    setCheckItems([])
  }
  return (
    <S.SearchType>
      <label htmlFor="type">검색조건</label>
      <select id="type" onChange={handleChange}>
        <option value="duty">당직</option>
        <option value="vacation">연차</option>
      </select>
    </S.SearchType>
  )
}

export default SelectedType
