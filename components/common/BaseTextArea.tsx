import styles from './styles/BaseTextArea.module.css'

type BaseTextAreaProps = {}

export default function BaseTextArea(props: BaseTextAreaProps) {
  return (
    <textarea
      className={styles.textArea}
      rows={3}
      placeholder="Add a comment..."
    />
  )
}
