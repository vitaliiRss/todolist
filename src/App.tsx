import React, { useReducer, } from 'react';
import { TaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addEmptyArrayTasksAC, addTaskAC, changeTaskStatusAC, removeArrayTasksAC, removeTaskAC, tasksReducer, updateTaskAC } from "./tasksReducer";
import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistReducer, updateTodolistAC } from "./todolistReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Сhicken", isDone: true },
      { id: v1(), title: "Apple", isDone: false },
      { id: v1(), title: "Cheese", isDone: false },
      { id: v1(), title: "Cake", isDone: true },
    ]
  });

  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC(title, todolistId))
  }

  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todolistId, taskId))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(updateTaskAC(todolistId, taskId, title))
  }

  const addTodolist = (title: string) => {
    const todolistId = v1();
    dispatchTodolists(addTodolistAC(title, todolistId))
    dispatchTasks(addEmptyArrayTasksAC(todolistId))
  }

  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId))
    dispatchTasks(removeArrayTasksAC(todolistId))
  }

  const updateTodolist = (todolistId: string, title: string) => {
    dispatchTodolists(updateTodolistAC(todolistId, title))
  }

  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    dispatchTodolists(changeFilterAC(todolistId, value))
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
                    removeTodolist={removeTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    updateTask={updateTask}
                    updateTodolist={updateTodolist}
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
