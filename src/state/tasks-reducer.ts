import { AddTodolistACType, RemoveTodolistACType, SetTodolistsACType } from "./todolists-reducer";
import { ResultCode, TaskType, UpdateTaskModelType, todolistsAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";
import { SetErrorACType, SetAppStatusACType, setAppStatusAC } from "./app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

type TasksActionsType = SetTodolistsACType
  | AddTodolistACType
  | RemoveTodolistACType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | SetAppStatusACType
  | SetErrorACType

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const copyState = { ...state }
      action.todolists.forEach(todolist => {
        copyState[todolist.id] = []
      })
      return copyState
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.todolist.id]: [] }
    }
    case "REMOVE-TODOLIST": {
      // const { [action.todolistId]: [], ...rest } = state
      // return rest
      let copyState = { ...state }
      delete copyState[action.todolistId]
      return copyState
    }
    case 'SET-TASKS': {
      return { ...state, [action.todolistId]: action.tasks }
    }
    case "ADD-TASK": {
      return {
        ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    }
    case "REMOVE-TASK": {
      return { ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId) }
    }
    case "UPDATE-TASK": {
      return {
        ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? { ...task, ...action.model } : task)
      }
    }
    default:
      return state
  }
}

// Action Creators
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'SET-TASKS',
    tasks, todolistId
  } as const
}

export const addTaskAC = (task: TaskType) => {
  return {
    type: 'ADD-TASK',
    task
  } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: "REMOVE-TASK",
    todolistId,
    taskId
  } as const
}

export const updateTaskAC = (todolistId: string, taskId: string, model: Partial<UpdateTaskModelType>) => {
  return {
    type: "UPDATE-TASK",
    todolistId,
    taskId,
    model
  } as const
}

// Thunk Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.getTasks(todolistId)
    .then((response) => {
      dispatch(setTasksAC(todolistId, response.data.items))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.createTask(title, todolistId)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(addTaskAC(response.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistsAPI.deleteTask(todolistId, taskId)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const task = tasks[todolistId].find(task => task.id === taskId)

    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }

    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(response => {
        if (response.data.resultCode === ResultCode.SUCCESS) {
          dispatch(updateTaskAC(todolistId, taskId, apiModel))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(response.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }