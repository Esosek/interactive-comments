import { ReactElement } from 'react'

import styles from './styles/PrimaryButton.module.css'

type PrimaryButtonProps = {
  children: ReactElement | string
  type?: 'submit' | 'button' | 'reset' | undefined
  onClick?: () => void
  disabled?: boolean
}

export default function PrimaryButton({
  children,
  type = 'button',
  onClick = () => {},
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={styles.primaryButton}
    >
      {typeof children === 'string' ? children.toUpperCase() : children}
    </button>
  )
}
