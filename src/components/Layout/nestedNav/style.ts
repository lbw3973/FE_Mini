import styled from '@emotion/styled'
import * as StyledLayout from '../style'
import MaterialAccordion from '@mui/material/Accordion'
import MaterialAccordionSummary from '@mui/material/AccordionSummary'

export const NestedNavItem = styled(StyledLayout.NavItem)`
  width: calc(100% - 25px);
  margin-left: 20px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`
export const NestedNavMainIconWrapper = styled.div`
  margin-right: 12px;
  svg {
    font-size: ${({ theme }) => theme.app.size.font.medium};
    display: flex;
    align-items: center;
  }
`

export const Accordion = styled(MaterialAccordion)`
  width: 100%;
  background-color: transparent;
  box-shadow: none;
  &::before {
    display: none;
  }

  .MuiAccordionDetails-root {
    padding: 0;
  }

  .Mui-expanded {
    max-height: 40px;
    margin: 0;
  }
`

export const AccordionSummary = styled(MaterialAccordionSummary)`
  height: 40px;
  padding: 8px;
`
