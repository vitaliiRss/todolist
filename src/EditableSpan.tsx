import React, { ChangeEvent, memo, useState } from 'react'

type EditableSpanPropsType = {
  oldTitle: string
  isDone?: boolean
  onClick: (newTitle: string) => void
}

export const EditableSpan = memo(({ oldTitle, isDone, onClick }: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)

  const editText = () => {
    setEdit(!edit)
    if (edit) {
      addTask()
    }
  }

  const addTask = () => {
    onClick(newTitle)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  return (
    edit
      ?
      <input type="text" value={newTitle} onBlur={editText} onChange={onChangeHandler} autoFocus />
      :
      <span onDoubleClick={editText} className={isDone ? "task-done task" : "task"}>{oldTitle}</span>
  )
})