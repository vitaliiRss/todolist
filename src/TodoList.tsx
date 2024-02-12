import React from 'react';
import { filterValuesType } from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (value: filterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {
  return (
    <div className="App">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input />
          <button>+</button>
        </div>

        <ul>
          {props.tasks.map( (task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => {props.removeTask(task.id)}}>x</button>
              </li>
            )
          })}
        </ul>

        <div>
          <button onClick={ () => {props.changeFilter("all")}}>All</button>
          <button onClick={ () => {props.changeFilter("active")}}>Active</button>
          <button onClick={ () => {props.changeFilter("completed")}}>Completed</button>
        </div>
      </div>
    </div>
  );
}