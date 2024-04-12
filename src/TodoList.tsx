import React, { memo, useCallback } from 'react';
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { Task } from "./Task";
import { ButtonContainer } from "./ButtonContainer";
import { v1 } from "uuid";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  filter: FilterValuesType
  title: string
  tasks: Array<TaskType>
  removeTodolist: (todolistId: string) => void
  changeTodolistFilter: (todolistId: string, value: FilterValuesType) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  addTask: (title: string, todolistId: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {
  console.log('Todolist')

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.todolistId)
  }, [props.removeTodolist, props.todolistId])

  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.todolistId, newTitle)
  }, [props.changeTodolistTitle, props.todolistId])

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todolistId)
  }, [props.addTask, props.todolistId])

  const onClickHandlerAll = useCallback(() => { props.changeTodolistFilter(props.todolistId, "all") }, [props.changeTodolistFilter, props.todolistId]);
  const onClickHandlerActive = useCallback(() => { props.changeTodolistFilter(props.todolistId, "active") }, [props.changeTodolistFilter, props.todolistId]);
  const onClickHandlerCompleted = useCallback(() => { props.changeTodolistFilter(props.todolistId, "completed") }, [props.changeTodolistFilter, props.todolistId]);

  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  return (
    <div className="todolist">
      <div>
        <Box gap={1} mb={1} display="flex" alignItems="center">
          <EditableSpan oldTitle={props.title} onClick={changeTodolistTitle} />
          <IconButton onClick={removeTodolist} aria-label="delete" size="small"><DeleteIcon /></IconButton>
        </Box>
        <AddItemForm onClick={addTask} id={props.todolistId} />
        <Box my={2}>
          {tasksForTodolist.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                todolistId={props.todolistId}
                removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
              />
            )
          })}
        </Box>
        <div>
          <Stack direction="row" spacing={1}>
            <ButtonContainer variant={props.filter === "all" ? "contained" : "outlined"} size="small" onClick={onClickHandlerAll} title={'All'} />
            <ButtonContainer variant={props.filter === "active" ? "contained" : "outlined"} size="small" onClick={onClickHandlerActive} title={'Active'} />
            <ButtonContainer variant={props.filter === "completed" ? "contained" : "outlined"} size="small" onClick={onClickHandlerCompleted} title={'Completed'} />
          </Stack>
        </div>
      </div>
    </div >
  );
})