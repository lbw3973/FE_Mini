import * as S from './style'
import PositionListItem from '../PositionListItem'
import { useGetPositions } from '../../hooks/useGetPositions'

function PositionList() {
  const positions = useGetPositions()

  return (
    <S.PositionList>
      <div className="table-header row">
        <span>직급명</span>
        <span>연차제한</span>
        <span className="edit"></span>
        <span className="delete"></span>
      </div>
      <ul>{positions && positions.map((position, index) => <PositionListItem key={index} position={position} />)}</ul>
    </S.PositionList>
  )
}

export default PositionList
