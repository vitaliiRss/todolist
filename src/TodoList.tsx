import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todolistId: string
  filter: FilterValuesType
  title: string
  tasks: TaskType[]
  removeTodolist: (todolistId: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  let [taskTitle, setTaskTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(props.todolistId, taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  const onClickHandlerAll = () => { props.changeFilter(props.todolistId, "all") }
  const onClickHandlerActive = () => { props.changeFilter(props.todolistId, "active") }
  const onClickHandlerCompleted = () => { props.changeFilter(props.todolistId, "completed") }
  const removeTodolist = () => { props.removeTodolist(props.todolistId) }

  return (
    <div className="todolist">
      <div>
        <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
        <div>
          <input value={taskTitle}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            className={error ? "error" : ""} />
          <button onClick={addTaskHandler}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>

        <ul>
          {tasksForTodolist.map((task) => {
            const onRemoveHandler = () => props.removeTask(props.todolistId, task.id)
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
                <span className={task.isDone ? "task-done task" : "task"}>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })}
        </ul>

        <div>
          <button className={props.filter === "all" ? "btn-active" : undefined} onClick={onClickHandlerAll}>
            All
          </button>
          <button className={props.filter === "active" ? "btn-active" : undefined} onClick={onClickHandlerActive}>
            Active
          </button>
          <button className={props.filter === "completed" ? "btn-active" : undefined} onClick={onClickHandlerCompleted}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}