import styles from './styles/CommentInput.module.css'
import { useUserStore } from '@/stores/userStore'
import Card from '../common/Card'
import UserImage from '../common/UserImage'
import BaseTextArea from '../common/BaseTextArea'
import PrimaryButton from '../common/PrimaryButton'

type CommentInputProps = {
  buttonLabel?: string
}

export default function CommentInput({
  buttonLabel = 'send',
}: CommentInputProps) {
  const { loggedUser } = useUserStore()
  return (
    <Card>
      <div className={styles.commentInput}>
        <div className={styles.userImage}>
          {loggedUser && <UserImage user={loggedUser} />}
        </div>
        <BaseTextArea />
        <PrimaryButton>{buttonLabel}</PrimaryButton>
      </div>
    </Card>
  )
}
