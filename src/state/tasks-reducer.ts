import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer";

export type AddTaskACType = ReturnType<typeof addTaskAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type TasktActionsType = AddTaskACType
  | RemoveTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistACType
  | RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: TasktActionsType): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK": {
      return { ...state, [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]] }
    }
    case "REMOVE-TASK": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
    }
    case "CHANGE-TASK-STATUS": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task) }
    }
    case "CHANGE-TASK-TITLE": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task) }
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] }
    }
    case "REMOVE-TODOLIST": {
      // const { [action.payload.todolistId]: [], ...rest } = state
      // return rest
      let copyState = { ...state }
      delete copyState[action.payload.todolistId]
      return copyState
    }
    default:
      return state
  }
}

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
      todolistId
    }
  } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistId,
      taskId
    }
  } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      todolistId,
      taskId,
      isDone
    }
  } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      todolistId,
      taskId,
      title
    }
  } as const
}