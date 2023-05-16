import { ChangeEvent, useState } from 'react'
import EditUserInfo from '../components/EditUserInfo'
import Modal from '../components/Modal'
import SearchUser from '../components/SearchUser'
import SearchedUserTable from '../components/SearchedUserTable'
import Table from '../components/Table'
import Title from '../components/Title'
import { SearchedUser, UserEntity, UserRole } from '../types/user'
import { useMutation } from '@tanstack/react-query'
import Pagenation from '../components/Pagenation'
import PositionManager from '../components/PositionManager'
import { searchUser } from '../api/admin'
import { SearchUserReq } from '../api/type'

export type SearchType = 'EMAIL' | 'POSITION' | 'NAME' | 'DEPARTMENT'

const dummy: SearchedUser = {
  total: 22,
  first: true,
  last: false,
  content: [
    {
      username: 'admin1',
      password: '$2a$10$CCCzhASb8vwUsc2J5n3Equ/q/Owu7bcEdysBXj3U2iMFC9VYpJtG.',
      role: 'STAFF' as UserRole,
      fileName: '404.jpg',
      email: 'test@naver.com',
      employeeNumber: '20221255',
      phoneNumber: '010-1234-1234',
      joiningDay: '2020-01-01',
      birthDate: '2023-04-26',
      years: 4,
      name: '김이이',
      updatedAt: '2023-05-05T22:27:34.727184',
      positionName: '과장',
      departmentName: '개발',
    },
    {
      username: 'admin2',
      password: '$2a$10$lWspLqjoRBd3S9CBh7PsYukKLrfICNubMFaE1PWerDF1ocDngDXDu',
      role: 'STAFF' as UserRole,
      fileName: '404.jpg',
      email: 'test@naver.com',
      employeeNumber: '20221277',
      phoneNumber: '010-1234-1234',
      joiningDay: '2020-01-01',
      birthDate: '2023-04-26',
      years: 4,
      name: '김독자',
      updatedAt: '2023-05-08T14:33:26.560266',
      positionName: '대리',
      departmentName: '개발',
    },
    {
      username: 'admin23',
      password: '$2a$10$3mBNOKqUzYSWjtjdxBarcOsz6zjPZ7D.42EQYnqiRRXRzNUkmS1fO',
      role: 'ADMIN' as UserRole,
      fileName: '404.jpg',
      email: 'test@naver.com',
      employeeNumber: '20221276',
      phoneNumber: '010-1234-1234',
      joiningDay: '2020-01-01',
      birthDate: '2023-04-26',
      years: 4,
      name: '김독자',
      updatedAt: '2023-05-08T14:33:25.705969',
      positionName: '대리',
      departmentName: '개발',
    },
  ],
}

function UserControl() {
  const [openModal, setOpenModal] = useState(false)
  const [userData, setUserData] = useState<UserEntity>()
  const [searchType, setSearchType] = useState<SearchType>('NAME')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [nowSearching, setNowSearching] = useState({ type: '', keyword: '' }) // 검색 시 현재 검색정보 저장
  const [maxPageLength, setMaxPageLength] = useState(1) // 검색 시 최대 페이지 저장

  const { data: seachedUser, mutate: searchMutate } = useMutation((key: SearchUserReq) => searchUser(key), {
    onSuccess: (data) => {
      // setMaxPageLength(data.total)
    },
  })

  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const searchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType)
  }

  const onSearch = () => {
    if (searchInput.length <= 1) return alert('최소 2글자 이상 입력해주세요')
    setNowSearching({ type: searchType, keyword: searchInput })
    searchMutate({ type: searchType, keyword: searchInput, page: 0 })
    setPage(1)
  }

  const getAllUsers = () => {
    searchMutate({ type: 'ALL', keyword: '', page: 0 })
    setNowSearching({ type: 'ALL', keyword: '' })
    setPage(1)
  }

  const pageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (page === value) return
    setPage(value)
    searchMutate({ type: nowSearching.type, keyword: nowSearching.keyword, page: value - 1 })
  }

  return (
    <>
      <Title text={'유저정보 관리'} />
      <SearchUser
        searchType={searchType}
        searchInput={searchInput}
        searchInputChange={searchInputChange}
        searchTypeChange={searchTypeChange}
        getAllUsers={getAllUsers}
        onSearch={onSearch}
      />
      <Table>
        <SearchedUserTable
          // users={seachedUser?.content}
          users={dummy.content}
          ModalHandler={setOpenModal}
          setUserData={setUserData}
        />
      </Table>
      <Pagenation page={page} maxLength={maxPageLength} pageChange={pageChange} />

      {openModal && (
        <Modal ModalHandler={setOpenModal}>
          <EditUserInfo userData={userData} />
        </Modal>
      )}
    </>
  )
}

export default UserControl
