import React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import { MdExpandMore } from 'react-icons/md'
import * as S from './style'

type NestedNavMenu = {
  title: string
  to: string
  icon?: React.ReactNode
}

interface NestedNavProp {
  mainIcon?: React.ReactNode
  mainTitle: string
  menuInfoList: NestedNavMenu[]
  isAuth?: boolean
}

function NestedNav({ mainIcon, mainTitle, menuInfoList, isAuth = true }: NestedNavProp) {
  return isAuth ? (
    <S.Accordion defaultExpanded={menuInfoList.some((menu) => menu.to === location.pathname)}>
      <S.AccordionSummary id={`nested-nav-${Date.now()}`} expandIcon={<MdExpandMore />}>
        <S.NestedNavMainIconWrapper>{mainIcon ? mainIcon : null}</S.NestedNavMainIconWrapper>
        {mainTitle}
      </S.AccordionSummary>
      <AccordionDetails>
        {menuInfoList.map((menu) => (
          <S.NestedNavItem key={Date.now() + menu.title} to={menu.to}>
            {menu?.icon ? menu.icon : null}
            {menu.title}
          </S.NestedNavItem>
        ))}
      </AccordionDetails>
    </S.Accordion>
  ) : null
}

export default NestedNav
