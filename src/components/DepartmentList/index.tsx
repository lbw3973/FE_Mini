import * as S from './style'
import DepartmentListItem from '../DepartmentListItem'
import { useGetDepartments } from '../../hooks/useGetDepartments'

function DepartmentList() {
  const departments = useGetDepartments()

  return (
    <S.DepartmentList>
      <div className="table-header row">
        <span>부서명</span>
        <span>부서인원</span>
        <span>일일연차제한</span>
        <span className="edit"></span>
        <span className="delete"></span>
      </div>
      <ul>
        {departments &&
          departments.map((department, index) => <DepartmentListItem key={index} department={department} />)}
      </ul>
    </S.DepartmentList>
  )
}

export default DepartmentList
