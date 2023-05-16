import { useMutation } from '@tanstack/react-query'
import { client } from '../main'
import { editDepartment } from '../api/department'
import { DepartmentEditReq } from '../api/type'

export const UseModifyDepartment = () => {
  const { mutate } = useMutation((department: DepartmentEditReq) => editDepartment(department), {
    onSuccess: () => {
      client.invalidateQueries(['department'])
    },
  })

  return mutate
}
