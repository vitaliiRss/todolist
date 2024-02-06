import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";

// CRUD
// create read update delete

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "all"|"active"|"completed";

function App() {
  const todoListTitle = "What to learn";

  const [tasks, setTasks] = useState([ // current state
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS/TS", isDone: false },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "StyledComponents", isDone: true },
  ])

  console.log(tasks); // array of objects

  function removeTask(taskId: number) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    console.log(tasks);  // same array (state still not updated after filter)
  }

  const [filter, setFilter] = useState<FilterValuesType>("all")

  let taskForTodoList = tasks;

  if(filter === "active") {
    taskForTodoList = tasks.filter( task => task.isDone === false)
  }

  if(filter === "completed") {
    taskForTodoList = tasks.filter( task => task.isDone === true)
  }

  function changeFilter(filter: FilterValuesType) {
    setFilter(filter);
  }

  return (
    <div className="App">
      <TodoList tasks={taskForTodoList}
                todoListTitle={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter} />
    </div>
  );
}

export default App;
