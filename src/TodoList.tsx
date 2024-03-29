import React, { ChangeEvent } from 'react';
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  filter: FilterValuesType
  title: string
  tasks: TaskType[]
  removeTodolist: (todolistId: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolist: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  const updateTodolist = (newTitle: string) => {
    props.updateTodolist(props.todolistId, newTitle)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId)
  }

  const updateTask = (taskId: string, newTitle: string) => {
    props.updateTask(props.todolistId, taskId, newTitle)
  }

  const onClickHandlerAll = () => { props.changeFilter(props.todolistId, "all") }
  const onClickHandlerActive = () => { props.changeFilter(props.todolistId, "active") }
  const onClickHandlerCompleted = () => { props.changeFilter(props.todolistId, "completed") }
  const removeTodolist = () => { props.removeTodolist(props.todolistId) }

  return (
    <div className="todolist">
      <div>
        <Box gap={1} mb={1} display="flex" alignItems="center">
          <EditableSpan oldTitle={props.title} callBack={updateTodolist} />
          <IconButton onClick={removeTodolist} aria-label="delete" size="small"><DeleteIcon /></IconButton>
        </Box>
        <AddItemForm onClick={addTask} />
        <Box my={2}>
          {tasksForTodolist.map((task) => {
            const onRemoveHandler = () => props.removeTask(props.todolistId, task.id)
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)

            return (
              <Stack direction="row" alignItems="center" spacing={1} key={task.id}>
                <Checkbox checked={task.isDone} onChange={onChangeHandler} />
                <EditableSpan oldTitle={task.title} isDone={task.isDone} callBack={(newTitle) => updateTask(task.id, newTitle)} />
                <IconButton onClick={onRemoveHandler} aria-label="delete" size="small"><DeleteIcon /></IconButton>
              </Stack>
            )
          })}
        </Box>

        <div>
          <Stack direction="row" spacing={1}>
            <Button
              variant={props.filter === "all" ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={onClickHandlerAll}>
              All
            </Button>
            <Button
              variant={props.filter === "active" ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={onClickHandlerActive}
            >Active
            </Button>
            <Button
              variant={props.filter === "completed" ? "contained" : "outlined"}
              size="small"
              color="primary"
              onClick={onClickHandlerCompleted}
            >Completed
            </Button>
          </Stack>
        </div>
      </div>
    </div >
  );
}