import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ResultCode, TodolistType, todolistsAPI } from "../api/todolist-api"
import { RequestStatusType, appActions } from "./app-slice"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "../utils"
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todolist) => {
          state.push({ ...todolist, filter: "all", entityStatus: "idle" })
        })
        // return action.payload.todolists.map((todolist) => ({ ...todolist, filter: "all", entityStatus: "idle" }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.title = action.payload.title
        }
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

// Thunk Creators
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(`${slice.name}/fetchTodolists`, async (_args, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.getTodolists()
    dispatch(appActions.setAppStatus({ status: "succeeded" }))
    return { todolists: response.data }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.createTodolist(title)
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolist: response.data.data.item }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(`${slice.name}/removeTodolist`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.removeTodolist(todolistId)
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { todolistId }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const changeTodolistTitle = createAppAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>(`${slice.name}/changeTodolistTitle`, async (args, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.updateTodolist(args.todolistId, args.title)
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return args
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored 
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const { selectTodolists } = slice.selectors
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle };