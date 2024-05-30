import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ResultCode, TodolistType, todolistsAPI } from "../api/todolist-api"
import { RequestStatusType, appActions } from "./app-slice"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { AppThunk } from "../store/store"

export type FilterValuesType = "all" | "active" | "completed"

// State
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      action.payload.todolists.forEach((todolist) => {
        state.push({ ...todolist, filter: "all", entityStatus: "idle" })
      })
      // return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    clearTodolist() {
      return []
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const { selectTodolists } = slice.selectors


// Thunk Creators
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI.getTodolists()
    .then((response) => {
      dispatch(todolistsActions.setTodolists({ todolists: response.data }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.createTodolist(title)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(todolistsActions.addTodolist({ todolist: response.data.data.item }))
        } else {
          handleServerAppError(response.data, dispatch)
        }
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "loading" }))
    todolistsAPI.deleteTodolist(todolistId)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(todolistsActions.removeTodolist({ todolistId }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
        dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, status: "idle" }))
      })
  }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    todolistsAPI.updateTodolist(todolistId, title)
      .then((response) => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }))
          dispatch(appActions.setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
