import { useMutation } from '@tanstack/react-query'
import { deleteDepartment } from '../api/department'
import { client } from '../main'

export const useDeleteDepartment = () => {
  const { mutate } = useMutation((departmentName: string) => deleteDepartment(departmentName), {
    onSuccess: () => {
      client.invalidateQueries(['department'])
    },
  })

  return mutate
}
