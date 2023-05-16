import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { createCalendarEvent } from '../../util'
import { CustomEvent } from '../../pages/Home'
import { DateLocalizer } from 'react-big-calendar'
import Toolbar from './Toolbar'
import * as S from './style'

// const tmpEvents = [
//   createCalendarEvent({ id: 1, title: '김아무(개발)', start: '2023-05-01', end: '2023-05-01', type: 'duty' }),
//   createCalendarEvent({ id: 2, title: '박아무(영업)', start: '2023-05-09', end: '2023-05-09', type: 'duty' }),
//   createCalendarEvent({ id: 3, title: '광아무(영업)', start: '2023-05-23', end: '2023-05-23', type: 'duty' }),
//   createCalendarEvent({ id: 4, title: '조아무(인사)', start: '2023-05-04', end: '2023-05-06', type: 'vacation' }),
//   createCalendarEvent({ id: 5, title: '최아무(마케팅)', start: '2023-05-12', end: '2023-05-18', type: 'vacation' }),
//   createCalendarEvent({ id: 6, title: '이아무(마케팅)', start: '2023-05-20', end: '2023-05-22', type: 'vacation' }),
// ]

interface BigCalendarProps {
  localizer: DateLocalizer
  vacations: CustomEvent[]
  dutys: CustomEvent[]
  eventPropGetter: (event: CustomEvent) => {
    style: {
      backgroundColor: string
      border: string
      color: string
      borderRadius: string
      outline: string
    }
  }
  onSelect: (event: CustomEvent) => void
  onNavigate: (date: Date) => void
}

function BigCalendar({ vacations, dutys, localizer, eventPropGetter, onSelect, onNavigate }: BigCalendarProps) {
  return (
    <S.CalendarContainer>
      <Calendar
        localizer={localizer}
        events={vacations && dutys && ([...vacations, ...dutys] as CustomEvent[])}
        defaultView="month"
        culture={'ko'}
        views={{
          month: true,
          week: true,
          agenda: false,
        }}
        popup={true}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        components={{
          toolbar: (props) => <Toolbar {...props} />,
          // eventWrapper: EventWrapper,
        }}
        eventPropGetter={(event) => eventPropGetter(event as CustomEvent)}
        onSelectEvent={(event) => onSelect(event as CustomEvent)}
        onNavigate={onNavigate}
      />
    </S.CalendarContainer>
  )
}

export default BigCalendar
