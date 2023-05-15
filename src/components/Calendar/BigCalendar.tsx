import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dayjsLocalizer, NavigateAction, Event } from 'react-big-calendar'
import { dayjsInstance } from '../../util'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import EventWrapper from './EventWrapper'
import * as S from './style'
import dayjs from 'dayjs'
import { Vacation, VacationStatus } from '../../types/vacation'

export interface CostomEvent extends Event {
  type: string
}

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

  useEffect(() => {
    const formattedDate = dayjs(new Date()).format('YYYY-MM-DD')
    vacationMutate(formattedDate)
    dutyMutate(formattedDate)
  }, [])

  return (
    <S.CalendarContainer>
      <Calendar
        localizer={localizer}
        events={vacations && dutys && ([...vacations, ...dutys] as CostomEvent[])}
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
          eventWrapper: EventWrapper,
        }}
        onNavigate={onNavigate}
      />
    </S.CalendarContainer>
  )
}

export default BigCalendar
