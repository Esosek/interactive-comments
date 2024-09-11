import { ReactElement } from 'react'

import styles from './styles/PrimaryButton.module.css'

type PrimaryButtonProps = {
  children: ReactElement | string
}

export default function PrimaryButton({ children }: PrimaryButtonProps) {
  // TODO: Implement onclick callback
  return (
    <button className={styles.primaryButton}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </button>
  )
}
