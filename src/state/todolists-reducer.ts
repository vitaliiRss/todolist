import { TodolistType, todolistsAPI } from "../api/todolist-api";
import { Dispatch } from "redux";

// export type SetTodolistsACACType = {
//   type: 'SET-TODOLISTS'
//   todolists: TodolistType[]
// }


export type SetTodolistsACACType = ReturnType<typeof setTodolistsAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

type TodolistActionsType = SetTodolistsACACType
  | AddTodolistACType
  | RemoveTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(todolist => ({ ...todolist, filter: 'all' }))
    }
    case "ADD-TODOLIST": {
      return [{ ...action.todolist, filter: 'all' }, ...state]
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
export const getTodolistsTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
  todolistsAPI.getTodolists()
    .then((response) => {
      dispatch(setTodolistsAC(response.data))
    })
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.createTodolist(title)
      .then((response) => {
        dispatch(addTodolistAC(response.data.data.item))
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then((response) => {
        dispatch(removeTodolistAC(todolistId))
      })
  }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
      .then((response) => {
        dispatch(changeTodolistTitleAC(id, title))
      })
  }
}