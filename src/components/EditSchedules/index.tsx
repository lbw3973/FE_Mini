import * as S from './style'
import { CustomEvent } from '../../pages/Home'
import { useTheme } from '@mui/material'
import Button from '../Button'
import dayjs from 'dayjs'

interface ScheduleProps {
  data: CustomEvent | undefined
  deleteHandler: (id: number, type: string) => void
}

function EditSchedules({ data, deleteHandler }: ScheduleProps) {
  const theme = useTheme()

  return (
    <S.ModifyForm>
      {data ? (
        <>
          <h2>연차/당직 관리</h2>

          <div className="row">
            <div className="user">
              <span>신청자: </span>
              <span>{data.title}</span>
            </div>
            <div className="type">
              <span>구분: </span>
              <span>{data.type === 'duty' ? '당직' : '연차'}</span>
            </div>
          </div>

          <div className="date">
            <div className="start">
              <span>시작일: </span>
              <span>{dayjs(data.start).format('YYYY-MM-DD')}</span>
            </div>
            <span> ~ </span>
            <div className="end">
              <span>종료일: </span>
              <span>{dayjs(data.end).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          {data.type === 'vacation' && (
            <div className="confirm">
              <Button
                bg={theme.app.palette.green1}
                fontcolor={theme.app.palette.white}
                onClick={() => deleteHandler(data.id, data.type)}
              >
                삭제
              </Button>
            </div>
          )}
        </>
      ) : (
        <div>잠시만 기다려주세요</div>
      )}
    </S.ModifyForm>
  )
}

export default EditSchedules
