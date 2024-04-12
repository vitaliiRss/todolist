import React, { useReducer, } from 'react';
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";
import { todolistsReducer, addTodolistAC, removeTodolistAC, ChangeTodolistTitleAC, ChangeTodolistFilterAC } from "./state/todolists-reducer";

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
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
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

  // Todolist scope
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  const changeTodolistFilter = (todolistId: string, value: FilterValuesType) => {
    dispatchTodolists(ChangeTodolistFilterAC(todolistId, value))
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(ChangeTodolistTitleAC(todolistId, title))
  }

  // Task scope
  const addTask = (title: string, todolistId: string) => {
    dispatchTasks(addTaskAC(title, todolistId))
  }

  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todolistId, taskId))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
  }

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
