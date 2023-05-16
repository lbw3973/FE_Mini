import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { CustomEvent } from '../../pages/Home'
import { DateLocalizer } from 'react-big-calendar'
import Toolbar from './Toolbar'
import * as S from './style'

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
        }}
        eventPropGetter={(event) => eventPropGetter(event as CustomEvent)}
        onSelectEvent={(event) => onSelect(event as CustomEvent)}
        onNavigate={onNavigate}
      />
    </S.CalendarContainer>
  )
}

export default BigCalendar
