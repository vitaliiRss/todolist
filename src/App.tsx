import React, { useState } from 'react';
import { TaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksType>({
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

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(task => task.id !== todolistId))
    delete tasks[todolistId]
  }

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }

  const addTask = (title: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
  }

  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
  }

  const addTodolist = (title: string) => {
    const todolistId = v1();
    const newTask: TodolistsType = { id: todolistId, title: title, filter: 'all' }
    setTodolists([...todolists, newTask])
    setTasks({ [todolistId]: [], ...tasks })
    console.log(11);

  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task) })
  }

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
  }

  return (
    <div className="App">
      <AddItemForm onClick={addTodolist} />
      {todolists.map((todolist) => {
        return (
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
        )
      })}
    </div>
  )
}

export default App;