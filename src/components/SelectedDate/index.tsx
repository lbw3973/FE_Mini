import * as S from '../SelectedType/style'
import SelectedType from '../SelectedType'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '../Button'

function SelectedDate() {
  return (
    <S.SearchType>
      <label htmlFor="type">검색조건</label>
      <select id="type">
        <option value="vacation">연차</option>
        <option value="duty">당직</option>
      </select>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label htmlFor="type">날짜</label>
        <DatePicker label="시작날짜" slotProps={{ textField: { size: 'small' } }} />
        -
        <DatePicker label="종료날짜" slotProps={{ textField: { size: 'small' } }} />
      </LocalizationProvider>
      <Button bg="#069C31" fontcolor="#fff" size="large">
        신청
      </Button>
    </S.SearchType>
  )
}

export default SelectedDate
