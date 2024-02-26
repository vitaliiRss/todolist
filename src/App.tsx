import React, { useState } from 'react';
import { TaskType, Todolist } from "./TodoList";
import { v1 } from "uuid";

export type filterValuesType = "all" | "active" | "completed"

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQl", isDone: true }
  ])

  let [filter, setFilter] = useState<filterValuesType>("all")

  const removeTask = (taskId: string) => {
    tasks = tasks.filter(task => task.id !== taskId)
    setTasks(tasks)
  }

  const addTask = (taskTitle: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false }
    setTasks([newTask, ...tasks])
  }

  function changeTaskStatus(taskId: string, newIsDone: boolean) {
    // const task = tasks.find(task => task.id === taskId)
    // if (task) {
    //   task.isDone = !task.isDone
    //   setTasks([...tasks])
    // }

    const nextState = tasks.map(task => task.id === taskId ? { ...task, isDone: newIsDone } : task)
    setTasks(nextState)
  }



  function getFilteredTasks(tasks: Array<TaskType>, filterValue: filterValuesType): Array<TaskType> {
    let todolistTasks = tasks;
    if (filterValue === "active") {
      todolistTasks = tasks.filter(task => task.isDone === false)
    }
    if (filterValue === "completed") {
      todolistTasks = tasks.filter(task => task.isDone === true)
    }

    return todolistTasks
  }

  const filteredTask = getFilteredTasks(tasks, filter)

  const changeFilter = (filterValue: filterValuesType) => {
    setFilter(filterValue)
  }

  return (
    <div className="App">
      <Todolist title={"What to learn"}
        tasks={filteredTask}
        filter={filter}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus} />
    </div>
  );
}

export default App;