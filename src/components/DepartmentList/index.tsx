import * as S from './style'
import { DepartmentEntity } from '../../types/department'
import { useMutation } from '@tanstack/react-query'
import { deleteDepartment, editDepartment } from '../../api/department'
import { DepartmentEditReq } from '../../api/type'
import DepartmentListItem from '../DepartmentListItem'

const dummy: DepartmentEntity[] = [
  {
    departmentName: '영업',
    vacationLimit: 3,
    departmentPersonal: 10,
    status: 'ACTIVATION',
  },
  {
    departmentName: '개발',
    vacationLimit: 5,
    departmentPersonal: 10,
    status: 'ACTIVATION',
  },
  {
    departmentName: '인사',
    vacationLimit: 1,
    departmentPersonal: 10,
    status: 'ACTIVATION',
  },
]

function DepartmentList() {
  const { mutate: modifyMutate } = useMutation((department: DepartmentEditReq) => editDepartment(department))
  const { mutate: deleteMutate } = useMutation((departmentName: string) => deleteDepartment(departmentName))

  const onEdit = (departmentName: string, vacationLimit: number) => {
    modifyMutate({ departmentName, vacationLimit })
  }

  const onDelete = (departmentName: string) => {
    deleteMutate(departmentName)
  }

  return (
    <S.DepartmentList>
      <div className="table-header row">
        <span>부서명</span>
        <span>일일연차제한</span>
        <span className="edit"></span>
        <span className="delete"></span>
      </div>
      <ul>
        {dummy.map((department, index) => (
          <DepartmentListItem key={index} department={department} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </S.DepartmentList>
  )
}

export default DepartmentList
