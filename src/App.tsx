import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC } from "./state/tasks-reducer";
import { FilterValuesType, TodolistDomainType, fetchTodolistsTC, addTodolistTC, removeTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC } from "./state/todolists-reducer";
import { useAppDispatch, useAppSelector } from "./state/store";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { TaskStatuses } from "./api/todolist-api";
import { Todolist } from "./features/Todolist/Todolist";
import CustomizedSnackbars from "./components/ErrorSnackbar/ErrorSnackbar";

function App() {
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TasksStateType>(state => state.tasks)
  const status = useAppSelector(state => state.app.status);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  // Todolist scope
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])

  const changeTodolistFilter = useCallback((todolistId: string, value: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
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

  return (
    <div className="App">
      <CustomizedSnackbars />
      <ButtonAppBar />
      {status === 'loading' && <LinearProgress color="secondary" />}
      <Container maxWidth="xl">
        <Grid container >
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
      </Container>
    </div>
  )
}

export default App;