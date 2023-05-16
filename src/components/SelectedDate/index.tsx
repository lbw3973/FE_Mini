import * as S from '../SelectedType/style'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '../Button'
import { instance } from '../../api/instance'
import { useState } from 'react'
import { dayjsInstance } from '../../util'
import { useAccessTokenInfo } from '../../store/slices/userSlice'
// import { applyVacation, applyDuty } from '../../api/vacation'
interface VacationData {
  start: string
  end: string
}

interface DutyData {
  username: string
  day: string
}
async function applyVacation({ start, end }: VacationData) {
  const { status } = await instance.post('/api/v1/vacation/save', {
    start,
    end,
  })
  if (status !== 200) {
    throw new Error('')
  }
}

async function applyDuty({ username, day }: DutyData) {
  const { status } = await instance.post('/api/v1/duty/save', {
    username,
    day,
  })
  if (status !== 200) {
    throw new Error('')
  }
}
interface ModifiedDutyProps {
  username: string
  day: string
}
function SelectedDate() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedOption, setSelectedOption] = useState('vacation')
  // const { modal, dispatch } = useModalInfo()
  const { user } = useAccessTokenInfo()

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
      alert('연차신청이 완료됐습니다')
    } catch (err) {
      console.log(err)
      alert('연차신청이 실패했습니다')
    }
  }

  const handleApplyDuty = async () => {
    const start = dayjsInstance(startDate).startOf('day').format('YYYY-MM-DD')
    const end = dayjsInstance(endDate).startOf('day').format('YYYY-MM-DD')
    const day = dayjsInstance(endDate).startOf('day').format('YYYY-MM-DD')
    const username = user.userPayload?.username
    if (start !== end) {
      alert('당직은 같은 일자로만 신청 가능합니다')
    } else {
      applyDuty({ username, day } as ModifiedDutyProps)
      alert('당직신청이 성공적으로 되었습니다')
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
          // @ts-ignore
          onChange={(newValue: string) => setStartDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
        />
        -
        <DatePicker
          label="종료날짜"
          value={endDate}
          // @ts-ignore
          onChange={(newValue: string) => setEndDate(newValue)}
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>

      <Button
        onClick={() => {
          handleClick(), setStartDate(''), setEndDate('')
        }}
        bg="#069C31"
        fontcolor="#fff"
        size="large"
      >
        신청
      </Button>
    </S.SearchType>
  )
}

export default SelectedDate
