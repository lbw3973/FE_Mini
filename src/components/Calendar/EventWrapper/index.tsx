import { Event } from 'react-big-calendar'
import * as S from './style'

interface CostomEvent extends Event {
  type: string
}

interface CostomEventWrapperProps {
  event: CostomEvent
}

function EventWrapper({ event }: CostomEventWrapperProps) {
  return (
    <>
      <S.EventWrapper className={event.type}>{event.title}</S.EventWrapper>
    </>
  )
}

export default EventWrapper
