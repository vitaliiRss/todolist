import React, { useCallback } from 'react';
import { AddItemForm } from "./AddItemForm";
import { addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";
import { addTodolistAC, removeTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC } from "./state/todolists-reducer";
import { useSelector, useDispatch } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType, Todolist } from "./Todolist";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  // Todolist scope
  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch])

  const changeTodolistFilter = useCallback((todolistId: string, value: FilterValuesType) => {
    dispatch(ChangeTodolistFilterAC(todolistId, value))
  }, [dispatch])

  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(todolistId, title))
  }, [dispatch])

  // Task scope
  const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  }, [dispatch])

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  }, [dispatch])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
  }, [dispatch])

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title))
  }, [dispatch])

  return (
    <div className="App">
      <ButtonAppBar />
      <Container maxWidth="xl">
        <Grid container >
          <Grid item my={4}>
            <AddItemForm onClick={addTodolist} id={v1()} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((todolist) => {
            return (
              <Grid item key={todolist.id}>
                <Paper sx={{ p: 3 }} elevation={3}>
                  <Todolist
                    todolistId={todolist.id}
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
