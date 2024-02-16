import React, { useState } from 'react';
import { Todolist } from "./TodoList";
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

  function removeTask(taskId: string) {
    tasks = tasks.filter(task => task.id !== taskId)
    setTasks(tasks)
  }

  function addTask(title: string) {
    const newTask = { id: v1(), title: title, isDone: false }
    setTasks([newTask, ...tasks])
  }

  let [filter, setFilter] = useState<filterValuesType>("all")

  let todolistTasks = tasks;

  if (filter === "active") {
    todolistTasks = tasks.filter(task => task.isDone === false)
  }

  if (filter === "completed") {
    todolistTasks = tasks.filter(task => task.isDone === true)
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value)
  }

  return (
    <div className="App">
      <Todolist title={"What to learn"}
        tasks={todolistTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask} />
    </div>
  );
}

export default App;