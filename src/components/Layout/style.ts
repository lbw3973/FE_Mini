import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

export const Grid = styled.div`
  display: grid;
  ${({ theme }) => css`
    grid-template-rows: ${theme.app.size.header.height} calc(100vh - ${theme.app.size.header.height});
    grid-template-columns: ${theme.app.size.nav.width} 1fr;
    grid-template-areas:
      'header header'
      'nav page';
  `}
`

export const Header = styled.header`
  box-sizing: border-box;
  padding: 8px 25px;
  grid-area: header;
  background-color: ${({ theme }) => theme.app.palette.white};
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9;
`

export const Nav = styled.nav`
  display: flex;
  position: sticky;
  flex-direction: column;
  justify-content: space-between;
  grid-area: nav;
  padding: 40px 25px 25px;
  min-height: 100%;
  height: max-content;
  top: ${({ theme }) => theme.app.size.header.height};
  background-color: ${({ theme }) => theme.app.palette.green3};
  z-index: 8;
`

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
  padding: 8px 10px;
  width: 100%;
  height: 40px;
  color: ${({ theme }) => theme.app.palette.black};
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.app.palette.green1};
    color: ${({ theme }) => theme.app.palette.white};

    svg path {
      stroke: ${({ theme }) => theme.app.palette.white};
    }
  }

  &.active {
    ${({ theme }) =>
      css`
        background-color: ${theme.app.palette.green1};
        box-shadow: 0 5px 8px 0 #5ebc678f;
        color: ${theme.app.palette.white};
      `}

    svg path {
      stroke: ${({ theme }) => theme.app.palette.white};
    }
  }
`

export const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div {
    width: 100%;
  }
`

export const Page = styled.div`
  position: relative;
  padding: 40px;
  box-sizing: border-box;
  grid-area: page;
  overflow: auto;
`
