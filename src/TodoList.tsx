import React, { ChangeEvent } from 'react';
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  updateTask: (todolistId: string, taskId: string, newTitle: string) => void
  updateTodolist: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => !t.isDone);
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone);
  }

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId)
  }

  const updateTask = (taskId: string, newTitle: string) => {
    props.updateTask(props.todolistId, taskId, newTitle)
  }

  const updateTodolist = (newTitle: string) => {
    props.updateTodolist(props.todolistId, newTitle)
  }

  const onClickHandlerAll = () => { props.changeFilter(props.todolistId, "all") }
  const onClickHandlerActive = () => { props.changeFilter(props.todolistId, "active") }
  const onClickHandlerCompleted = () => { props.changeFilter(props.todolistId, "completed") }
  const removeTodolist = () => { props.removeTodolist(props.todolistId) }

  return (
    <div className="todolist">
      <div>
        <h3><EditableSpan oldTitle={props.title} callBack={updateTodolist} /> <button onClick={removeTodolist}>x</button></h3>
        <AddItemForm onClick={addTask} />
        <ul>
          {tasksForTodolist.map((task) => {
            const onRemoveHandler = () => props.removeTask(props.todolistId, task.id)
            const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)

            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
                <EditableSpan oldTitle={task.title} isDone={task.isDone} callBack={(newTitle) => updateTask(task.id, newTitle)} />
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