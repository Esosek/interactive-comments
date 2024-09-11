import { ReactElement } from 'react'

import styles from './styles/Card.module.css'

type CardProps = {
  children: ReactElement
}

export default function Card({ children }: CardProps) {
  return <div className={styles.card}>{children}</div>
}
