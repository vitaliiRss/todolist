import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { todolistsReducer } from "../state/todolists-slice"
import { tasksReducer } from "../state/tasks-slice"
import { appReducer } from "../state/app-slice"
import { authReducer } from "../state/auth-slice"

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({ reducer: rootReducer })

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store
