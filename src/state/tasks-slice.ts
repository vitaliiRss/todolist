import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ResultCode, TaskType, UpdateTaskModelType, todolistsAPI } from "../api/todolist-api"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { AppThunk } from "../store/store"
import { appActions } from "./app-slice"
import { todolistsActions } from "./todolists-slice"

// State
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateTaskModelType }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((todolist) => {
          state[todolist.id] = []
        })
      })
      .addCase(todolistsActions.clearTodolist, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const { selectTasks } = slice.selectors

// Thunk Creators
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI.getTasks(todolistId)
    .then((response) => {
      dispatch(tasksActions.setTasks({ todolistId, tasks: response.data.items }))
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI.createTask(title, todolistId)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(tasksActions.addTask({ task: response.data.data.item }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI.deleteTask(todolistId, taskId)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(tasksActions.removeTask({ todolistId, taskId }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>): AppThunk => (dispatch, getState) => {
  const tasks = getState().tasks
  const task = tasks[todolistId].find((task) => task.id === taskId)

  if (!task) {
    //throw new Error("task not found in the state");
    console.warn("task not found in the state")
    return
  }

  const apiModel: UpdateTaskModelType = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...domainModel
  }

  dispatch(appActions.setAppStatus({ status: "loading" }))
  todolistsAPI
    .updateTask(todolistId, taskId, apiModel)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }))
        dispatch(appActions.setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(response.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
