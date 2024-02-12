import React, { useState } from 'react';
import { Todolist } from "./TodoList";

export type filterValuesType = "all" | "active" | "completed"

function App() {
  let [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Rest API", isDone: false },
    { id: 5, title: "GraphQl", isDone: true }
  ])

  function removeTask(taskId: number) {
    tasks = tasks.filter( task => task.id !== taskId)
    setTasks(tasks)
  }

  let [filter, setFilter] = useState<filterValuesType>("all")

  let todolistTasks = tasks;

  if(filter === "active") {
    todolistTasks = tasks.filter( task => task.isDone === false)
  }

  if(filter === "completed") {
    todolistTasks = tasks.filter( task => task.isDone === true)
  }

  function changeFilter(value: filterValuesType) {
    setFilter(value)
  }

  return (
    <div className="App">
      <Todolist title={"What to learn"}
                tasks={todolistTasks}
                removeTask={removeTask}
                changeFilter={changeFilter} />
    </div>
  );
}

export default App;