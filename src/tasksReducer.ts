import { v1 } from "uuid"
import { TasksType } from "./App"

type TaskReducerType = AddTaskACType | RemoveTaskACType | ChangeTaskStatusAC | UpdateTaskAC | AddEmptyArrayTasksACType | RemoveArrayTasksACType

export const tasksReducer = (state: TasksType, action: TaskReducerType): TasksType => {
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
    case "UPDATE-TASK": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task) }
    }
    case "ADD-EMPTY-ARRAY-TASKS": {
      return { ...state, [action.payload.todolistId]: [] }
    }
    case "REMOVE-ARRAY-TASKS": {
      delete state[action.payload.todolistId]
      return state
    }
    default:
      return state
  }
}

type AddTaskACType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
      todolistId
    }
  } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistId,
      taskId
    }
  } as const
}

type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

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

type UpdateTaskAC = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistId: string, taskId: string, title: string) => {
  return {
    type: "UPDATE-TASK",
    payload: {
      todolistId,
      taskId,
      title
    }
  } as const
}

type AddEmptyArrayTasksACType = ReturnType<typeof addEmptyArrayTasksAC>

export const addEmptyArrayTasksAC = (todolistId: string) => {
  return {
    type: "ADD-EMPTY-ARRAY-TASKS",
    payload: {
      todolistId,
    }
  } as const
}

type RemoveArrayTasksACType = ReturnType<typeof removeArrayTasksAC>

export const removeArrayTasksAC = (todolistId: string) => {
  return {
    type: "REMOVE-ARRAY-TASKS",
    payload: {
      todolistId,
    }
  } as const
}