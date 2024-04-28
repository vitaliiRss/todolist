import { v1 } from "uuid";
import { TodolistType } from "../api/todolist-api";

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof ChangeTodolistFilterAC>

type TodolistActionsType = AddTodolistACType
  | RemoveTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistBusinesType = TodolistType & {
  filter: FilterValuesType
}


const initialState: TodolistBusinesType[] = []

export const todolistsReducer = (state: TodolistBusinesType[] = initialState, action: TodolistActionsType): TodolistBusinesType[] => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return [...state, { id: action.payload.todolistId, title: action.payload.title, addedDate: "", order: 0, filter: "all" }]
    }
    case "REMOVE-TODOLIST": {
      return state.filter(task => task.id !== action.payload.todolistId)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(todolist => todolist.id === action.payload.todolistId ? { ...todolist, title: action.payload.title } : todolist)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(todolist => todolist.id === action.payload.todolistId ? { ...todolist, filter: action.payload.value } : todolist)
    }
    default:
      return state
  }
}

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId: v1()
    }
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      todolistId
    }
  } as const
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      todolistId,
      title
    }
  } as const
}

export const ChangeTodolistFilterAC = (todolistId: string, value: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      todolistId,
      value
    }
  } as const
}