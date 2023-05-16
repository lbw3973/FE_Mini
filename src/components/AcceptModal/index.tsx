import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '../Button'
import * as S from './style'
import { useTheme } from '@mui/material'
import { testUser } from '../UserScheduleControl'
import { useToast } from '../../hooks'

const pathSignUp = '/admin/signup'
const pathSchedule = '/admin/schedule'

export default function AcceptModal({
  open,
  handleClose,
  modalMsg,
  acceptFunc,
  rejectFunc,
  checkItems,
}: {
  open: boolean
  handleClose: () => void
  modalMsg: string
  acceptFunc: (id?: string) => void
  rejectFunc: (id?: string) => void
  checkItems: string[]
}) {
  const { showToast } = useToast('승인 완료')
  const theme = useTheme()

  const handleClick = () => {
    const users = employeeNumberToUserName()
    users.map(async (user) => {
      const item = location.pathname === pathSignUp ? user.username : user.employeeNumber
      console.log(item)
      modalMsg === '승인' ? acceptFunc(item) : rejectFunc(item)
    })
    // const item = location.pathname === pathSignUp ? testUser.username : testUser.employeeNumber
    // console.log(item)
    // modalMsg === '승인' ? acceptFunc() : rejectFunc()
    handleClose()
    showToast()
  }

  const employeeNumberToUserName = () => {
    return testUser.filter((user) => checkItems.includes(user.employeeNumber))
    // return filterUser.map((el) => `${el.name} `)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <S.MaterialBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalMsg} 하시겠습니까?
            <p>{employeeNumberToUserName().map((el) => `${el.name} `)}</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'end', gap: '15px' }}>
            <Button bg={theme.app.palette.green1} fontColor={theme.app.palette.white} onClick={handleClick}>
              확인
            </Button>
            <Button bg={theme.app.palette.red} fontColor={theme.app.palette.white} onClick={handleClose}>
              취소
            </Button>
          </Typography>
        </S.MaterialBox>
      </Modal>
    </>
  )
}
