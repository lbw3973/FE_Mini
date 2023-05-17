import { useMutation } from '@tanstack/react-query'
import { PositionEditReq } from '../api/type'
import { editPosition } from '../api/position'
import { client } from '../main'

export const useModifyPosition = () => {
  const { mutate } = useMutation((position: PositionEditReq) => editPosition(position), {
    onSuccess: () => {
      client.invalidateQueries(['position'])
    },
  })

  return mutate
}
