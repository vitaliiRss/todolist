import React, { memo, useCallback, useEffect, useMemo } from "react"
import { useAppDispatch } from "../../store/store"
import { TaskStatuses, TaskType } from "../../api/todolist-api"
import { FilterValuesType } from "../../state/todolists-slice"
import { fetchTasksTC } from "../../state/tasks-slice"
import { RequestStatusType } from "../../state/app-slice"
import { AddItemForm } from "../../components/AddItemForm/AddItemForm"
import { EditableSpan } from "../../components/EditableSpan/EditableSpan"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { Task } from "../Task/Task"
import { ButtonContainer } from "../../components/ButtonContainer/ButtonContainer"

type PropsType = {
  todolistId: string
  entityStatus: RequestStatusType
  filter: FilterValuesType
  title: string
  tasks: TaskType[]
  removeTodolist: (todolistId: string) => void
  changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  addTask: (title: string, todolistId: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Todolist = memo((props: PropsType) => {
  // console.log("Todolist")

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolistId))
  }, [])

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.todolistId)
  }, [props.removeTodolist, props.todolistId])

  const changeTodolistTitle = useCallback((newTitle: string) => {
      props.changeTodolistTitle(props.todolistId, newTitle)
  }, [props.changeTodolistTitle, props.todolistId])

  const addTask = useCallback((title: string) => {
      props.addTask(title, props.todolistId)
  }, [props.addTask, props.todolistId])

  const onClickHandlerAll = useCallback(() => {
    props.changeTodolistFilter(props.todolistId, "all")
  }, [props.changeTodolistFilter, props.todolistId])
  
  const onClickHandlerActive = useCallback(() => {
    props.changeTodolistFilter(props.todolistId, "active")
  }, [props.changeTodolistFilter, props.todolistId])
  
  const onClickHandlerCompleted = useCallback(() => {
    props.changeTodolistFilter(props.todolistId, "completed")
  }, [props.changeTodolistFilter, props.todolistId])

  let tasks = props.tasks

  if (props.filter === "active") {
    tasks = props.tasks.filter((task) => task.status === TaskStatuses.New)
  }
  if (props.filter === "completed") {
    tasks = props.tasks.filter((task) => task.status === TaskStatuses.Completed)
  }

  return (
    <div className="todolist">
      <div>
        <Box gap={1} mb={1} display="flex" alignItems="center">
          <EditableSpan oldTitle={props.title} onClick={changeTodolistTitle} />
          <IconButton onClick={removeTodolist} aria-label="delete" size="small" disabled={props.entityStatus === "loading"}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <AddItemForm disable={props.entityStatus === "loading"} onClick={addTask} />
        <Box my={2}>
          {tasks.map((task) => {
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
            <ButtonContainer
              variant={props.filter === "all" ? "contained" : "outlined"}
              size="small"
              onClick={onClickHandlerAll}
              title={"All"}
            />
            <ButtonContainer
              variant={props.filter === "active" ? "contained" : "outlined"}
              size="small"
              onClick={onClickHandlerActive}
              title={"Active"}
            />
            <ButtonContainer
              variant={props.filter === "completed" ? "contained" : "outlined"}
              size="small"
              onClick={onClickHandlerCompleted}
              title={"Completed"}
            />
          </Stack>
        </div>
      </div>
    </div>
  )
})
