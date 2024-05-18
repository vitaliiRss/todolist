import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../state/todolists-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import { authReducer } from "../state/auth-reducer";
import { appReducer } from "../state/app-reducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  auth: authReducer,
  app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;