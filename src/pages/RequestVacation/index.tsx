import { useState } from 'react'
import Table from '../../components/Table'
import Title from '../../components/Title'
import SelectedDate from '../../components/SelectedDate'
import { instance } from '../../api/instance'
import { useQuery } from '@tanstack/react-query'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import * as S from './style'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { dayjsInstance } from '../../util'

// 연차
async function fetchVacationList() {
  const res = await instance.get('/api/v1/vacation/list')

  return res.data.data
}

async function postModifyVacation(start, end) {
  const { data, status } = await instance.post('/api/v1/vacation/modify/', {
    id: vacation.id,
    start,
    end,
  })
  if (status == 200) {
    alert('연차가 성공적으로 수정되었습니다')
  }
}

// 당직
// async function fetchDutyList() {
//   const res = await instance.get('/api/v1/duty/list')

//   return res.data.data
// }

async function postModifyDuty() {
  const res = await instance.post('/api/v1/duty/modify', {
    id: '1',
    day: '2023-05-12',
  })
  return res
}

function RequestVacation() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { isLoading, error, data } = useQuery(['vacationList'], fetchVacationList)
  const [isModal, setIsModal] = useState(false)
  // const { isLoading: isDutyLoading, error9: dutyError, data: dutyData } = useQuery(['dutyList'], fetchDutyList)
  if (isLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }
  // if (isDutyLoading) {
  //   return <div>DutyLoading</div>
  // }
  // if (dutyError) {
  //   return <div>{dutyError.message}</div>
  // }
  const getStatusInKorean = (status: string) => {
    if (status === 'WAITING') {
      return '대기'
    } else if (status === 'OK') {
      return '승인 완료'
    } else if (status === 'REJECTED') {
      return '반려 완료'
    } else if (status === 'DELETED') {
      return '삭제 완료'
    } else if (status === 'UPDATE_WAITING') {
      return '수정됨 / 승인 대기 중'
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'OK') {
      return '#069C31'
    } else if (status === 'REJECTED') {
      return '#E2532D'
    } else if (status === 'DELETED') {
      return '#AEAEAE'
    } else if (status === 'UPDATE_WAITING') {
      return '수정됨 / 승인 대기'
    }
  }

  const handleVacationModification = async () => {
    const start = dayjsInstance(startDate).format('YYYY-MM-DD')
    const end = dayjsInstance(endDate).format('YYYY-MM-DD')
    await postModifyVacation(start, end)
  }

  return (
    <>
      <Title text="연차/당직 신청" />
      <SelectedDate />
      <Title text="내 연차/당직 보기" />
      <Table>
        <>
          <thead>
            <tr>
              <th>신청일</th>
              <th>구분</th>
              <th>당직(연차)일</th>
              <th>승인여부</th>
              <th>수정하기</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((vacation) => {
              return (
                <tr>
                  <td>{vacation?.createdAt}</td>
                  <td>연차</td>
                  <td>
                    {vacation?.start}~{vacation?.end}
                  </td>
                  <td style={{ color: getStatusColor(vacation.status) }}>{getStatusInKorean(vacation.status)}</td>
                  <td>
                    {vacation.status === 'WAITING' ? (
                      <Button
                        onClick={() => setIsModal(true)}
                        variant="contained"
                        bg="#069C31"
                        fontColor="#fff"
                        size="large"
                        type="submit"
                      >
                        수정하기
                      </Button>
                    ) : null}
                  </td>
                </tr>
              )
            })}

            {/* {dutyData?.map((duty) => {
              return (
                <tr>
                  <td>{duty?.createdAt}</td>
                  <td>당직</td>
                  <td>
                    {duty?.day}
                  </td>
                  <td style={{ color: getStatusColor(duty.status) }}>{getStatusInKorean(duty.status)}</td>
                  <td>
                    {duty.status === 'WAITING' ? (
                      <Button
                        onClick={() => setIsModal(true)}
                        variant="contained"
                        bg="#069C31"
                        fontColor="#fff"
                        size="large"
                        type="submit"
                        onClick={postModifyDuty}
                      >
                        수정하기
                      </Button>
                    ) : null}
                  </td>
                </tr>
              )
            })} */}
          </tbody>
        </>
      </Table>

      {/* 모달 */}
      {isModal ? (
        <Modal
          ModalHandler={(a: any): any => {
            return 1
          }}
          style={{ width: '420px', height: '420px' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {' '}
            <S.ModalDatePickerWrapper>
              {' '}
              시작날짜 <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />{' '}
            </S.ModalDatePickerWrapper>{' '}
            <S.ModalDatePickerWrapper>
              {' '}
              종료날짜
              <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />{' '}
            </S.ModalDatePickerWrapper>{' '}
          </LocalizationProvider>
          <S.ButtonWrapper>
            {' '}
            <Button
              variant="contained"
              bg="#069C31"
              fontColor="#fff"
              size="large"
              type="submit"
              onClick={handleVacationModification}
            >
              신청
            </Button>
            <Button
              variant="contained"
              bg="#069C31"
              fontColor="#fff"
              size="large"
              type="submit"
              onClick={() => setIsModal(false)}
            >
              닫기
            </Button>{' '}
          </S.ButtonWrapper>
        </Modal>
      ) : null}
    </>
  )
}

export default RequestVacation
