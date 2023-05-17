import { ChangeEvent, useState } from 'react'
import EditUserInfo from '../components/EditUserInfo'
import Modal from '../components/Modal'
import SearchUser from '../components/SearchUser'
import SearchedUserTable from '../components/SearchedUserTable'
import Table from '../components/Table'
import Title from '../components/Title'
import { UserEntity } from '../types/user'
import { useMutation } from '@tanstack/react-query'
import Pagenation from '../components/Pagenation'
import { searchUser } from '../api/admin'
import { SearchUserReq } from '../api/type'
import { SearchedUser } from '../types/user'

export type SearchType = 'ALL' | 'EMAIL' | 'POSITION' | 'NAME' | 'DEPARTMENT'
export interface NowSearchProp {
  type: SearchType
  keyword: string
}

function UserControl() {
  const [searchedUser, setSearchedUser] = useState<SearchedUser | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [userData, setUserData] = useState<UserEntity>()
  const [searchType, setSearchType] = useState<SearchType>('NAME')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [nowSearching, setNowSearching] = useState<NowSearchProp>({
    type: 'NAME',
    keyword: '',
  }) // 검색 시 현재 검색정보 저장
  const [maxPageLength, setMaxPageLength] = useState(1) // 검색 시 최대 페이지 저장

  const { mutate: searchMutate } = useMutation((key: SearchUserReq) => searchUser(key), {
    onSuccess: (data) => {
      setMaxPageLength(Math.ceil(data.total / 10))
      setSearchedUser(data)
    },
  })

  const searchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const searchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as SearchType)
  }

  const onSearch = (type: SearchType, keyword: string) => {
    if (searchInput.length <= 1) return alert('최소 2글자 이상 입력해주세요')
    setNowSearching({ ...nowSearching, type, keyword })
    searchMutate({ type, keyword, page: 0 })
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
        <SearchedUserTable users={searchedUser?.content} ModalHandler={setOpenModal} setUserData={setUserData} />
      </Table>
      <Pagenation page={page} maxLength={maxPageLength} pageChange={pageChange} />

      {openModal && (
        <Modal ModalHandler={setOpenModal}>
          <EditUserInfo
            userData={userData}
            nowSearching={nowSearching}
            ModalHandler={setOpenModal}
            onSearch={onSearch}
          />
        </Modal>
      )}
    </>
  )
}

export default UserControl
