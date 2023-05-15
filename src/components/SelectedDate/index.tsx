import * as S from '../SelectedType/style'
import SelectedType from '../SelectedType'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '../Button'
import { useMutation } from '@tanstack/react-query'
import { instance } from '../../api/instance'
import { useState } from 'react'
import { dayjsInstance } from '../../util'
import axios from 'axios'
import Modal from '../Modal'

interface VacationData {
  start: string
  end: string
}

interface DutyData {
  username: string
  day: string
}
async function applyVacation({ start, end }: VacationData) {
  const { data, status } = await instance.post('/api/v1/vacation/save', {
    start,
    end,
  })
  if (status !== 200) {
    throw new Error('')
  }
}

async function applyDuty({ username, day }: DutyData) {
  const { data, status } = await instance.post('/api/v1/duty/save', {
    username,
    day,
  })

  if (status !== 200) {
    throw new Error('')
  }
}

function SelectedDate() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedOption, setSelectedOption] = useState('vacation')

  function handleOptionChange(e) {
    setSelectedOption(e.target.value)
  }

  function handleClick() {
    if (selectedOption === 'vacation') {
      handleApplyVacation()
    } else if (selectedOption === 'duty') {
      handleApplyDuty()
    }
  }
  const handleApplyVacation = async () => {
    const start = dayjsInstance(startDate).startOf('day')
    const end = dayjsInstance(endDate).startOf('day')
    if (start.isAfter(end)) {
      alert('시작일은 종료일보다 같거나 빨라야 합니다')
      return
    }
    try {
      await applyVacation({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
      alert('연차신청 성공')
    } catch (err) {
      console.log(err)
      alert('연차신청 실패')
    }
  }

  const handleApplyDuty = async () => {
    const start = dayjsInstance(startDate).startOf('day').format('YYYY-MM-DD')
    const end = dayjsInstance(endDate).startOf('day').format('YYYY-MM-DD')
    const day = dayjsInstance(endDate).startOf('day').format('YYYY-MM-DD')
    if (start !== end) {
      console.log(start)
      console.log(end)
      alert('당직은 같은 일자로만 신청 가능합니다')
    } else {
      applyDuty({ username, day })
      alert('신청이 성공적으로 되었씁니다')
    }
  }
  return (
    <S.SearchType>
      <label htmlFor="type">검색조건</label>
      <select id="type" onChange={handleOptionChange}>
        <option value="vacation">연차</option>
        <option value="duty">당직</option>
      </select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label htmlFor="type">날짜</label>
        <DatePicker
          label="시작날짜"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
        />
        -
        <DatePicker
          label="종료날짜"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
      <Button onClick={handleClick} bg="#069C31" fontColor="#fff" size="large">
        신청
      </Button>
    </S.SearchType>
  )
}

export default SelectedDate
