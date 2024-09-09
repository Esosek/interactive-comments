import Image from "next/image"

import styles from "./styles/UserImage.module.css"

type UserImageProps = {
  username: string
  imagePath: string
  sizeInRem?: number
}

export default function UserImage({
  username,
  imagePath,
  sizeInRem = 2,
}: UserImageProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ height: `${sizeInRem}rem`, width: `${sizeInRem}rem` }}
    >
      <Image
        src={imagePath}
        alt={`Avatar of ${username}`}
        fill
        sizes={`${sizeInRem}rem`}
      />
    </div>
  )
}
