import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { filterValuesType } from "./App";

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (value: filterValuesType) => void
  addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {
  let [newTaskTitle, setNewTaskTitle] = useState("")

  const addTaskHandler = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
          <input value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler} />
          <button onClick={addTaskHandler}>+</button>
        </div>

        <ul>
          {props.tasks.map((task) => {
            const onRemoveHandler = () => {
              props.removeTask(task.id)
            }
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })}
        </ul>

        <div>
          <button onClick={onClickHandlerAll}>All</button>
          <button onClick={onClickHandlerActive}>Active</button>
          <button onClick={onClickHandlerCompleted}>Completed</button>
        </div>
      </div>
    </div>
  );
}