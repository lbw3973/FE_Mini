import * as S from './style'
import { PositionEntity } from '../../types/position'
import PositionListItem from '../PositionListItem'
import { useMutation } from '@tanstack/react-query'
import { PositionEditReq } from '../../api/type'
import { deletePosition, editPosition } from '../../api/position'

const dummy: PositionEntity[] = [
  {
    positionName: '사원',
    vacation: 12,
    status: 'ACTIVATION',
  },
  {
    positionName: '대리',
    vacation: 14,
    status: 'ACTIVATION',
  },
  {
    positionName: '팀장',
    vacation: 16,
    status: 'ACTIVATION',
  },
]

function PositionList() {
  const { mutate: modifyMutate } = useMutation((position: PositionEditReq) => editPosition(position))
  const { mutate: deleteMutate } = useMutation((positionName: string) => deletePosition(positionName))

  const onEdit = (positionName: string, vacation: number) => {
    modifyMutate({ positionName, vacation })
  }

  const onDelete = (positionName: string) => {
    deleteMutate(positionName)
  }

  return (
    <S.PositionList>
      <div className="table-header row">
        <span>직급명</span>
        <span>연차제한</span>
        <span className="edit"></span>
        <span className="delete"></span>
      </div>
      <ul>
        {dummy.map((position, index) => (
          <PositionListItem key={index} position={position} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </S.PositionList>
  )
}

export default PositionList
