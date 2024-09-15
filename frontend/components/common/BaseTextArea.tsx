import { useEffect, useRef } from 'react'
import styles from './styles/BaseTextArea.module.css'

type BaseTextAreaProps = {
  name?: string
  defaultValue?: string
  autoFocus?: boolean
}

export default function BaseTextArea({
  name = '',
  defaultValue,
  autoFocus = false,
}: BaseTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && defaultValue) {
      textAreaRef.current!.setSelectionRange(
        defaultValue.length,
        defaultValue.length
      )
    }
  }, [autoFocus, defaultValue])
  return (
    <textarea
      ref={textAreaRef}
      className={styles.textArea}
      name={name}
      rows={3}
      placeholder='Add a comment...'
      defaultValue={defaultValue}
      autoFocus={autoFocus}
    />
  )
}
