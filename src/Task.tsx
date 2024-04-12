import React, { ChangeEvent, memo } from 'react';
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TaskpropsType = {
  task: TaskType
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Task = memo((props: TaskpropsType) => {
  console.log('Task')
  const onClickHandler = () => {
    props.removeTask(props.todolistId, props.task.id)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
  }
  const onTitleChangeHandler = (newValue: string) => {
    props.changeTaskTitle(props.todolistId, props.task.id, newValue);
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1} key={props.task.id}>
      <Checkbox checked={props.task.isDone} onChange={onChangeHandler} />
      <EditableSpan oldTitle={props.task.title} isDone={props.task.isDone} onClick={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler} aria-label="delete" size="small"><DeleteIcon /></IconButton>
    </Stack>
  )
})