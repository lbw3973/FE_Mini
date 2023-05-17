import { NavigateAction, ToolbarProps } from 'react-big-calendar'
import * as S from './style'

type ViewType = 'month' | 'week'

const Toolbar = (props: ToolbarProps) => {
  const { date, view, onNavigate, onView } = props

  const navigate = (action: NavigateAction) => {
    onNavigate(action)
  }

  const changeView = (viewName: ViewType) => {
    onView(viewName)
  }

  return (
    <S.Toolbar className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button className="today" type="button" onClick={navigate.bind(null, 'TODAY')}>
          today
        </button>
        {/* <button
          className={`rbc-btn rbc-btn-month ${view === 'month' ? 'rbc-active' : ''}`}
          onClick={changeView.bind(null, 'month')}
        >
          Month
        </button>
        <button
          className={`rbc-btn rbc-btn-week ${view === 'week' ? 'rbc-active' : ''}`}
          onClick={changeView.bind(null, 'week')}
        >
          Week
        </button> */}
      </div>

      <div className="center">
        <button className="arrow" type="button" onClick={navigate.bind(null, 'PREV')}>
          ◀
        </button>
        <span className="rbc-toolbar-label">{`${new Date(date).getFullYear()}년 ${
          new Date(date).getMonth() + 1
        }월`}</span>
        <button className="arrow" type="button" onClick={navigate.bind(null, 'NEXT')}>
          ▶
        </button>
      </div>
      <div className="guide">
        <span className="duty">당직</span>
        <span className="vacation">연차</span>
      </div>
    </S.Toolbar>
  )
}

export default Toolbar
