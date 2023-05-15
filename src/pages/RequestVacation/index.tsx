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
import { setVacation, useModalInfo } from '../../store/slices/modalSlice'
import { Vacation } from '../../types/vacation'

// 연차
async function fetchVacationList() {
  try {
    const res = await instance.get('/api/v1/vacation/list')
    console.log({ res })
    return res.data.data.content
  } catch (e) {
    console.log(e)
  }
}

async function postModifyVacation({ id, start, end }) {
  const { data, status } = await instance.post(`/api/v1/vacation/modify/${id}`, {
    id,
    start,
    end,
  })
  if (status == 200) {
    alert('연차가 성공적으로 수정 신청되었습니다')
  } else {
    alert('오류가 발생했습니다. 다시 시도해주세요')
  }
}

// 당직
export async function fetchDutyList() {
  const res = await instance.get('/api/v1/duty/list')

  console.log({ res: res.data.data })

  return res.data.data
}

async function postModifyDuty() {
  const res = await instance.post('/api/v1/duty/modify', {
    id,
    day,
  })
  return res
}

function RequestVacation() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isModal, setIsModal] = useState(false)
  const { modal, dispatch } = useModalInfo()
  const { isLoading, error, data } = useQuery(['vacationList'], fetchVacationList)
  const { isLoading: isDutyLoading, error: dutyError, data: dutyData } = useQuery(['dutyList'], fetchDutyList)
  if (isLoading || isDutyLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }
  // if (isDutyLoading) {
  //   return <div>DutyLoading</div>
  // }
  if (dutyError) {
    return <div>{dutyError.message}</div>
  }
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
    const id = modal.vacationPayload?.id
    const start = dayjsInstance(startDate).format('YYYY-MM-DD')
    const end = dayjsInstance(endDate).format('YYYY-MM-DD')

    await postModifyVacation({ id, start, end })
  }

  return (
    <>
      {}
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
          {data ? (
            <tbody>
              {data?.map((vacation: Vacation) => {
                return (
                  <tr id={vacation.id}>
                    <td>{dayjsInstance(vacation?.createdAt).format('YYYY-MM-DD')}</td>
                    <td>연차</td>
                    <td>
                      {vacation?.start}~{vacation?.end}
                    </td>
                    <td style={{ color: getStatusColor(vacation.status) }}>{getStatusInKorean(vacation.status)}</td>
                    <td>
                      {vacation.status === 'WAITING' ? (
                        <Button
                          onClick={() => {
                            dispatch(
                              setVacation({
                                id: vacation?.id,
                              }),
                            )
                            setIsModal(true)
                          }}
                          variant="contained"
                          bg="#069C31"
                          fontcolor="#fff"
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

              {dutyData?.content.map((duty) => {
                return (
                  <tr id={duty.id}>
                    <td>{duty?.createdAt}</td>
                    <td>당직</td>
                    <td>{duty?.day}</td>
                    <td style={{ color: getStatusColor(duty.status) }}>{getStatusInKorean(duty.status)}</td>
                    <td>
                      {duty.status === 'WAITING' ? (
                        <Button
                          onClick={() => {
                            setIsModal(true)
                            postModifyDuty()
                          }}
                          variant="contained"
                          bg="#069C31"
                          fontcolor="#fff"
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
            </tbody>
          ) : null}
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
              fontcolor="#fff"
              size="large"
              type="submit"
              onClick={(e) => {
                handleVacationModification()
              }}
            >
              신청
            </Button>
            <Button
              variant="contained"
              bg="#069C31"
              fontcolor="#fff"
              size="large"
              type="submit"
              onClick={() => {
                setIsModal(false)
                setStartDate('')
                setEndDate('')
              }}
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
