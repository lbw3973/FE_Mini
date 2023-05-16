import BigCalendar from '../components/Calendar/BigCalendar'
import { useEffect, useState } from 'react'
import { Vacation } from '../types/vacation'
import { useMutation } from '@tanstack/react-query'
import { deleteVacation, getVacation } from '../api/vacation'
import { Event, dayjsLocalizer } from 'react-big-calendar'
import { dayjsInstance } from '../util'
import { useTheme } from '@mui/material'
import { DutyEntity } from '../types/duty'
import { getDuty } from '../api/duty'
import Modal from '../components/Modal'
import EditSchedules from '../components/EditSchedules'
import { useAccessTokenInfo } from '../store/slices/userSlice'

export interface CustomEvent extends Event {
  id: number
  type: string
}

function Home() {
  const {
    user: { userPayload },
  } = useAccessTokenInfo()
  const localizer = dayjsLocalizer(dayjsInstance)
  const [openModal, setOpenModal] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [modifyData, setModifyData] = useState<CustomEvent>()
  const [dutys, setDutys] = useState<CustomEvent[]>([])
  const [vacations, setVacations] = useState<CustomEvent[]>([])

  const theme = useTheme()

  const eventPropGetter = (event: CustomEvent) => {
    const defaultStyle = {
      color: theme.app.palette.black,
      borderRadius: '0px',
      outline: 'none',
    }

    if (event.type === 'duty') {
      return {
        style: {
          ...defaultStyle,
          backgroundColor: theme.app.palette.green2,
          border: `1px solid ${theme.app.palette.green4}`,
        },
      }
    } else {
      return {
        style: {
          ...defaultStyle,
          backgroundColor: theme.app.palette.yellow2,
          border: `1px solid ${theme.app.palette.yellow1}`,
        },
      }
    }
  }

  const { mutate: dutyMutate } = useMutation((month: number) => getDuty(month), {
    onSuccess: (data) => {
      const formattedData: CustomEvent[] = data.map((event: DutyEntity) => ({
        title: `${event.memberName}(${event.departmentName})`,
        start: new Date(event.day),
        end: new Date(event.day),
        status: event.status,
        type: 'duty',
        id: Number(event.id),
      }))

      setDutys([...formattedData])
    },
  })
  const { mutate: vacationMutate } = useMutation((month: number) => getVacation(month), {
    onSuccess: (data) => {
      const formattedData: CustomEvent[] = data.map((event: Vacation) => ({
        title: `${event.memberName}(${event.departmentName})`,
        start: new Date(event.start),
        end: new Date(event.end),
        status: event.status,
        type: 'vacation',
        id: Number(event.id),
      }))

      setVacations([...formattedData])
    },
  })

  const { mutate: deleteVacationMutate } = useMutation((id: number) => deleteVacation(id))

  const onSelect = (event: CustomEvent) => {
    if (!admin) return
    console.log(event)
    setOpenModal(true)
    setModifyData(event)
  }

  const onNavigate = async (date: Date) => {
    if (date) {
      const month = new Date(date).getMonth() + 1
      await Promise.all([vacationMutate(month), dutyMutate(month)])
    }
  }

  const deleteSchedule = (id: number, type: string) => {
    if (!admin) return
    if (type === 'vacation') {
      deleteVacationMutate(id)
    }
  }

  useEffect(() => {
    const month = new Date().getMonth() + 1
    vacationMutate(month)
    dutyMutate(month)
  }, [])

  useEffect(() => {
    if (userPayload?.role === 'ADMIN') {
      setAdmin(true)
    }
  }, [userPayload])

  return (
    <>
      <BigCalendar
        vacations={vacations}
        dutys={dutys}
        localizer={localizer}
        eventPropGetter={eventPropGetter}
        onSelect={onSelect}
        onNavigate={onNavigate}
      />
      {openModal && (
        <Modal ModalHandler={setOpenModal}>
          <EditSchedules data={modifyData} deleteHandler={deleteSchedule} />
        </Modal>
      )}
    </>
  )
}

export default Home
