import { Dispatch } from "redux"
import { ResultCode, authAPI } from "../api/todolist-api"
import { SetAppStatusACType, SetErrorACType, SetInitializedACType, setAppStatusAC, setInitializedAC } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { LoginType } from "../features/Login/Login"

// Actions Type
type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

type AuthActionsType =
  | SetIsLoggedInACType
  | SetAppStatusACType
  | SetErrorACType
  | SetInitializedACType

// State
type AuthStateType = {
  isLoggedIn: boolean
}

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case "LOGIN/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

// Action Creators
export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: "LOGIN/SET-IS-LOGGED-IN",
    value
  } as const
}

// Thunk Creators
export const loginTC = (data: LoginType) => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.login(data)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    })
}

export const meTC = () => (dispatch: Dispatch<AuthActionsType>) => {
  // dispatch(setAppStatusAC("loading"))
  authAPI.me()
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    })
    .finally(() => {
      dispatch(setInitializedAC(true))
    })
}

export const LogOutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
  dispatch(setAppStatusAC("loading"))
  authAPI.logOut()
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch);
    })
}