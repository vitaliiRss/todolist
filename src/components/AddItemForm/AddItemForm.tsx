import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

export type AddItemFormPropsType = {
  onClick: (title: string) => void
  disable?: boolean
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addItem = () => {
    if (title.trim() !== "") {
      props.onClick(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (event.key === "Enter") addItem()
  }

  return (
    <Stack direction="row" alignItems="start" spacing={1}>
      <TextField
        label={error ? error : "type something..."}
        variant="outlined"
        size="small"
        disabled={props.disable}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <IconButton aria-label="delete" onClick={addItem} disabled={props.disable}>
        <AddIcon />
      </IconButton>
    </Stack>
  )
})