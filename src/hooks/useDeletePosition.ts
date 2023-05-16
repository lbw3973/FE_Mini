import { useMutation } from '@tanstack/react-query'
import { deletePosition } from '../api/position'
import { client } from '../main'

export const useDeletePosition = () => {
  const { mutate } = useMutation((positionName: string) => deletePosition(positionName), {
    onSuccess: () => {
      client.invalidateQueries(['position'])
    },
  })

  return mutate
}
