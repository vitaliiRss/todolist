import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "./App";

type TodolistReducerType = AddTodolistACType | RemoveTodolistACType | UpdateTodolistACType | ChangeFilterACType

export const todolistsReducer = (state: TodolistsType[], action: TodolistReducerType): TodolistsType[] => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return [...state, { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }]
    }
    case "REMOVE-TODOLIST": {
      return state.filter(task => task.id !== action.payload.todolistId)
    }
    case "UPDATE-TODOLIST": {
      return state.map(todolist => todolist.id === action.payload.todolistId ? { ...todolist, title: action.payload.title } : todolist)
    }
    case "CHANGE-FILTER": {
      return state.map(todolist => todolist.id === action.payload.todolistId ? { ...todolist, filter: action.payload.value } : todolist)
    }
    default:
      return state
  }
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId
    }
  } as const
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todolistId
    }
  } as const
}

type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>

export const updateTodolistAC = (todolistId: string, title: string) => {
  return {
    type: "UPDATE-TODOLIST",
    payload: {
      todolistId,
      title
    }
  } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      todolistId,
      value
    }
  } as const
}
