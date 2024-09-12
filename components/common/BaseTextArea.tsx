import styles from './styles/BaseTextArea.module.css'

type BaseTextAreaProps = {
  name: string
  defaultValue?: string
  autoFocus?: boolean
}

export default function BaseTextArea({
  name,
  defaultValue,
  autoFocus = false,
}: BaseTextAreaProps) {
  return (
    <textarea
      className={styles.textArea}
      name={name}
      rows={3}
      placeholder="Add a comment..."
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    />
  )
}
