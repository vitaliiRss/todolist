import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useAppDispatch } from "../../store/store"
import { addTaskTC, deleteTaskTC, selectTasks, updateTaskTC } from "../../state/tasks-slice"
import { TaskStatuses } from "../../api/todolist-api"
import { selectIsLoggedIn } from "../../state/auth-slice"
import { FilterValuesType, addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC, selectTodolists, todolistsActions} from "../../state/todolists-slice"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "../../components/AddItemForm/AddItemForm"
import { Todolist } from "../Todolist/Todolist"

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  // Todolist scope
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])

  const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
  }, [dispatch])

  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [dispatch])

  // Task scope
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskTC(title, todolistId))
  }, [dispatch])

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(deleteTaskTC(todolistId, taskId))
  }, [dispatch])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, { status }))
  }, [dispatch])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title }))
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container>
        <Grid item my={4}>
          <AddItemForm onClick={addTodolist} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((todolist) => {
          return (
            <Grid item key={todolist.id}>
              <Paper sx={{ p: 3 }} elevation={3}>
                <Todolist
                  todolistId={todolist.id}
                  entityStatus={todolist.entityStatus}
                  filter={todolist.filter}
                  title={todolist.title}
                  tasks={tasks[todolist.id]}
                  // Todolist scope
                  removeTodolist={removeTodolist}
                  changeTodolistFilter={changeTodolistFilter}
                  changeTodolistTitle={changeTodolistTitle}
                  // Task scope
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
