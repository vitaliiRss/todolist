import React, { useState } from 'react';
import { TaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
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
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ]
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(task => task.id !== todolistId))
    delete tasks[todolistId]
  }

  const removeTask = (todolistId: string, id: string) => {
    // tasks = tasks.filter(task => task.id !== taskId)
    // setTasks(tasks)
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id) })
  }

  const addTask = (todolistId: string, title: string) => {
    // const newTask = { id: v1(), title: taskTitle, isDone: false }
    // setTasks([newTask, ...tasks])
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title: title, isDone: false }, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    // setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: boolean } : task))
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
  }

  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    // setFilter(filterValue)
    setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            filter={el.filter}
            title={el.title}
            tasks={tasks[el.id]}
            removeTodolist={removeTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
          />
        )
      })}
    </div>
  )
}

export default App;