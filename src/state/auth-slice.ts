import { createSlice } from "@reduxjs/toolkit"
import { ResultCode, authAPI } from "../api/todolist-api"
import { appActions } from "./app-slice"
import { todolistsActions } from "./todolists-slice"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "../utils"
import { LoginType } from "../features/Login/Login"

// State
type AuthStateType = {
  isLoggedIn: boolean
}

const initialState: AuthStateType = {
  isLoggedIn: false
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn
  }
})

// Thunk Creators
const me = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/me`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }))
  }
})

const logIn = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(`${slice.name}/logIn`, async (userData, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await authAPI.login(userData)
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logOut`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await authAPI.logOut()
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(todolistsActions.clearTodolist())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const { selectIsLoggedIn } = slice.selectors
export const authThunks = { me, logIn, logOut }