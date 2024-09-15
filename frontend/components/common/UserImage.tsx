import Image from 'next/image'

import styles from './styles/UserImage.module.css'
import { User } from '@/types/user'

type UserImageProps = {
  user: User
  sizeInRem?: number
}

export default function UserImage({ user, sizeInRem = 2 }: UserImageProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ height: `${sizeInRem}rem`, width: `${sizeInRem}rem` }}
    >
      <Image
        src={user.image.webp}
        alt={`Avatar of ${user.username}`}
        fill
        sizes={`${sizeInRem}rem`}
      />
    </div>
  )
}
