import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
  onClick: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== "") {
      props.onClick(title.trim());
      setTitle("");
      console.log(title);
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTask()
    }
  }

  return (
    <div>
      <input value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""} />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}