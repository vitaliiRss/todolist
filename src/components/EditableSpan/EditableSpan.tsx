import React, { ChangeEvent, memo, useState } from "react"

type EditableSpanPropsType = {
  oldTitle: string
  status?: number
  onClick: (newTitle: string) => void
}

export const EditableSpan = memo(({ oldTitle, status, onClick }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(oldTitle)

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(oldTitle);
  }

  const activateViewMode = () => {
    setEditMode(false);
    onClick(newTitle);
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  return (
    editMode
      ?
      <input type="text" value={newTitle} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus />
      :
      <span onDoubleClick={activateEditMode} className={status ? "task-done task" : "task"}>{oldTitle}</span>
  )
})


