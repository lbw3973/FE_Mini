import styled from '@emotion/styled'

export const CalendarContainer = styled.div`
  .rbc-calendar {
    overflow: hidden;
  }
  .rbc-header {
    line-height: 1.8;
  }
  .rbc-time-view {
    .rbc-label {
      display: none;
    }
    .rbc-allday-cell {
      height: 540px;
      max-height: unset;
    }
    .rbc-time-content {
      display: none;
    }
  }
  .rbc-event-content {
    /* padding: 2px; */
  }
  .rbc-show-more {
    color: ${({ theme }) => theme.app.palette.green1};
    margin: 2px 4px;
  }
  .rbc-date-cell {
    text-align: center;
    padding: 4px;
  }
  .rbc-off-range-bg {
    background-color: ${({ theme }) => theme.app.palette.gray2};
  }
`
