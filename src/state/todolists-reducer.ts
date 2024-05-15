import { ResultCode, TodolistType, todolistsAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { RequestStatusType, SetErrorACType, SetAppStatusACType, setErrorAC, setAppStatusAC } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

// export type SetTodolistsACType = {
//   type: 'SET-TODOLISTS'
//   todolists: TodolistType[]
// }

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>


type TodolistActionsType = SetTodolistsACType
  | ChangeTodolistEntityStatusACType
  | AddTodolistACType
  | RemoveTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType
  | SetAppStatusACType
  | SetErrorACType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map(todolist => ({ ...todolist, filter: "all", entityStatus: "idle" }))
    }
    case "CHANGE-ENTITY-STATUS": {
      return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, entityStatus: action.status } : todolist)
    }
    case "ADD-TODOLIST": {
      return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
    }
    case "REMOVE-TODOLIST": {
      return state.filter(task => task.id !== action.todolistId)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, title: action.title } : todolist)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(todolist => todolist.id === action.todolistId ? { ...todolist, filter: action.filter } : todolist)
    }
    default:
      return state
  }
}

// Action Creators
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {
    type: 'SET-TODOLISTS',
    todolists
  } as const
}

export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => ({
  type: 'CHANGE-ENTITY-STATUS',
  todolistId,
  status
} as const)

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    todolist
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    todolistId
  } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    title
  } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId,
    filter
  } as const
}

// Thunk Creators
export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.getTodolists()
    .then((response) => {
      dispatch(setTodolistsAC(response.data))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(addTodolistAC(response.data.data.item))
        } else {
          handleServerAppError(response.data, dispatch)
        }
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(removeTodolistAC(todolistId))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
      })
  }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(changeTodolistTitleAC(todolistId, title))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}