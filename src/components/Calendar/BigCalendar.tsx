import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { createCalendarEvent } from '../../util'
import { CustomEvent } from '../../pages/Home'
import { DateLocalizer } from 'react-big-calendar'
import Toolbar from './Toolbar'
import * as S from './style'
import dayjs from 'dayjs'
import { Vacation, VacationStatus } from '../../types/vacation'
import { instance } from '../../api/instance'

// const tmpEvents = [
//   createCalendarEvent({ id: 1, title: '김아무(개발)', start: '2023-05-01', end: '2023-05-01', type: 'duty' }),
//   createCalendarEvent({ id: 2, title: '박아무(영업)', start: '2023-05-09', end: '2023-05-09', type: 'duty' }),
//   createCalendarEvent({ id: 3, title: '광아무(영업)', start: '2023-05-23', end: '2023-05-23', type: 'duty' }),
//   createCalendarEvent({ id: 4, title: '조아무(인사)', start: '2023-05-04', end: '2023-05-06', type: 'vacation' }),
//   createCalendarEvent({ id: 5, title: '최아무(마케팅)', start: '2023-05-12', end: '2023-05-18', type: 'vacation' }),
//   createCalendarEvent({ id: 6, title: '이아무(마케팅)', start: '2023-05-20', end: '2023-05-22', type: 'vacation' }),
// ]

function BigCalendar() {
  const tmpEvents: Vacation[] = [
    {
      id: 1,
      memberName: '김무무',
      departmentName: '개발',
      start: '2023-05-05',
      end: '2023-05-09',
      status: VacationStatus['WAITING'],
    },
    {
      id: 2,
      memberName: '박무무',
      departmentName: '개발',
      start: '2023-05-11',
      end: '2023-05-21',

      status: VacationStatus['WAITING'],
    },
  ]

  const localizer = dayjsLocalizer(dayjsInstance)
  const [dutys, setDutys] = useState<CostomEvent[]>([])
  const [vacations, setVacations] = useState<CostomEvent[]>([])

  const { data: duty, mutate: dutyMutate } = useMutation(
    async (date: string) => {
      //date담아보내기
      const res = await fetch('/api/v1/duty/list')
      return tmpEvents
    },
    {
      onSuccess: (data) => {
        const formattedData: CostomEvent[] = data.map((event) => ({
          title: event.memberName,
          start: new Date(event.start),
          end: new Date(event.start),
          status: event.status,
          type: 'duty',
        }))
        setDutys([...formattedData])
      },
    },
  )
  const { data: vacation, mutate: vacationMutate } = useMutation(
    async (date: string) => {
      //date담아보내기
      const res = await fetch('/api/v1/vacation/list')
      return tmpEvents
    },
    {
      onSuccess: (data) => {
        const formattedData: CostomEvent[] = data.map((event) => ({
          title: event.memberName,
          start: new Date(event.start),
          end: new Date(event.end),
          status: event.status,
          type: 'vacation',
        }))
        setVacations([...formattedData])
      },
    },
  )

  const onNavigate = async (date: Date) => {
    if (date) {
      const originDate = new Date(date)
      const formattedDate = dayjs(originDate).format('YYYY-MM-DD')

      await Promise.all([vacationMutate(formattedDate), dutyMutate(formattedDate)])
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
