import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginType } from "../features/Login/Login"
import { appActions } from "./app-slice"
import { ResultCode, authAPI } from "../api/todolist-api"
import { AppThunk } from "../store/store"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { todolistsActions } from "./todolists-slice"

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
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn
  }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const { selectIsLoggedIn } = slice.selectors

// Thunk Creators
export const loginTC = (data: LoginType): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  authAPI.login(data)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const meTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  authAPI.me()
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
}

export const LogOutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  authAPI.logOut()
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
        dispatch(todolistsActions.clearTodolist())
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}
