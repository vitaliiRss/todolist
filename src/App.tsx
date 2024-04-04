import React, { useReducer, } from 'react';
import { TaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";
import { todolistsReducer, addTodolistAC, removeTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC } from "./state/todolists-reducer";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";

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
  const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  // Todolist scope
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }

  const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => {
    dispatch(ChangeTodolistFilterAC(todolistId, value))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(ChangeTodolistTitleAC(todolistId, title))
  }

  // Task scope
  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  }

  const removeTask = (todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, title))
  }

  return (
    <div className="App">
      <ButtonAppBar />
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
                    key={todolist.id}
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
