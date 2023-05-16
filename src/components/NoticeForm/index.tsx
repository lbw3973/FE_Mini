import React from 'react'
import * as S from './style'
import { MdOutlineDoNotTouch } from 'react-icons/md'
import Title from '../Title'

export interface NoticeFormProps {
  title: string
  noticeType?: 'notAllow' | 'warn' | 'info'
  noticeIcon?: React.ReactNode
  content?: string
}

function NoticeForm({ noticeType, title, content, noticeIcon }: NoticeFormProps) {
  const IconComponent = () => {
    if (noticeIcon) return <>{noticeIcon}</>

    switch (noticeType) {
      case 'notAllow':
        return <MdOutlineDoNotTouch />
      case 'warn':
        return <div></div>
      case 'info':
      default:
        return <div></div>
    }
  }

  const Notice = () => {
    if (content) return <S.NoticeContent>{content}</S.NoticeContent>

    switch (noticeType) {
      case 'notAllow':
        return (
          <S.NoticeContent>
            <span>{'관리자의 권한이 필요한 페이지입니다.'}</span>
            <span>{'필요한 경우 관리자와 상의후 진행해주세요'}</span>
          </S.NoticeContent>
        )
      case 'warn':
      case 'info':
      default:
        return <S.NoticeContent>{''}</S.NoticeContent>
    }
  }

  return (
    <S.Wrapper>
      <S.Icon noticeType={noticeType}>
        <IconComponent />
      </S.Icon>
      <Title text={title} />
      <Notice />
    </S.Wrapper>
  )
}

export default NoticeForm
