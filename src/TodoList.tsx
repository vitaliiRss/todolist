import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { filterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  filter: filterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (filterValue: filterValuesType) => void
  addTask: (taskTitle: string) => void
  changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {
  let [taskTitle, settaskTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle.trim());
      settaskTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    settaskTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  const onClickHandlerAll = () => {
    props.changeFilter("all")
  }

  const onClickHandlerActive = () => {
    props.changeFilter("active")
  }

  const onClickHandlerCompleted = () => {
    props.changeFilter("completed")
  }

  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value={taskTitle}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className={error ? "error" : ""} />
          <button onClick={addTaskHandler}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>

        <ul>
          {props.tasks.map((task) => {

            const onRemoveHandler = () => props.removeTask(task.id)
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked)

            return (
              <li key={task.id}>
                <input type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeHandler} />
                <span className={task.isDone ? "task-done task" : "task"}>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })}
        </ul>

        <div>
          <button className={props.filter === "all" ? "btn-active" : undefined}
            onClick={onClickHandlerAll}>
            All
          </button>
          <button className={props.filter === "active" ? "btn-active" : undefined}
            onClick={onClickHandlerActive}>
            Active
          </button>
          <button className={props.filter === "completed" ? "btn-active" : undefined}
            onClick={onClickHandlerCompleted}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}