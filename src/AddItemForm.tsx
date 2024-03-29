import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
  onClick: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
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
    setError(null);
    if (event.key === "Enter") {
      addItem()
    }
  }

  return (
    <Stack direction="row" alignItems="start" spacing={1}>
      <TextField
        id="outlined-basic"
        label={error ? error : "type something..."}
        variant="outlined"
        size="small"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <IconButton aria-label="delete" onClick={addItem}>
        <AddIcon />
      </IconButton>
    </Stack>
  )
}