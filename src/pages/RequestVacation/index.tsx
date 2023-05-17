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
import { setVacation, setDuty, useModalInfo } from '../../store/slices/modalSlice'
import { Vacation } from '../../types/vacation'
import { fetchVacationList, postModifyVacation, applyVacation, applyDuty } from '../../api/vacation'
import { fetchDutyList, postModifyDuty } from '../../api/duty'

function RequestVacation() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isModal, setIsModal] = useState(false)
  const { modal, dispatch } = useModalInfo()
  const { isLoading, error, data } = useQuery(['vacationList'], fetchVacationList, {
    select: (res) => res.data,
  })
  const { isLoading: isDutyLoading, error: dutyError, data: dutyData } = useQuery(['dutyList'], fetchDutyList)
  if (isLoading || isDutyLoading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>{error.message}</div>
  }
  // if (isDutyLoading) {
  //   return <div>DutyLoading</div>
  //

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
    const start = dayjsInstance(startDate).startOf('day')
    const end = dayjsInstance(endDate).startOf('day')
    if (start.isAfter(end)) {
      alert('시작일은 종료일보다 같거나 빨라야 합니다')
      return
    }
    // const start = dayjsInstance(startDate).format('YYYY-MM-DD')
    // const end = dayjsInstance(endDate).format('YYYY-MM-DD')
    try {
      await postModifyVacation({ id, start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
      dispatch(setVacation(null))
    } catch (err) {
      alert('연차신청이 실패했습니다')
    }
  }

  const handleDutyModification = async () => {
    const id = modal.dutyPayload?.id
    const start = dayjsInstance(startDate).format('YYYY-MM-DD')
    const day = dayjsInstance(endDate).format('YYYY-MM-DD')

    if (start !== day) {
      alert('당직은 시작일자와 종료일자가 같아야 합니다')
    } else {
      await postModifyDuty({ id, day })

      dispatch(setDuty(null))
      alert('신청완료했습니다. 관리자의 승인을 기다려주세요')
    }
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
                  <tr id={vacation?.id}>
                    <td>{dayjsInstance(vacation?.createAt).format('YYYY-MM-DD')}</td>
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

              {dutyData?.map((duty) => {
                return (
                  <tr id={duty.id}>
                    <td>{dayjsInstance(duty?.createdAt).format('YYYY-MM-DD')}</td>
                    <td>당직</td>
                    <td>{duty?.day}</td>
                    <td style={{ color: getStatusColor(duty.status) }}>{getStatusInKorean(duty.status)}</td>
                    <td>
                      {duty.status === 'WAITING' ? (
                        <Button
                          onClick={() => {
                            dispatch(
                              setDuty({
                                id: duty?.id,
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
            <Button
              variant="contained"
              bg="#FF0000"
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
            <Button
              variant="contained"
              bg="#069C31"
              fontcolor="#fff"
              size="large"
              type="submit"
              onClick={() => {
                if (modal.vacationPayload) return handleVacationModification()
                if (modal.dutyPayload) return handleDutyModification()
              }}
            >
              신청
            </Button>
          </S.ButtonWrapper>
        </Modal>
      ) : null}
    </>
  )
}

export default RequestVacation
