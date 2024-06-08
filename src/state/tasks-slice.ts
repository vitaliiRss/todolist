import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ArgsAddTask, ArgsUpdateTask, ResultCode, TaskType, UpdateTaskModelType, todolistsAPI } from "../api/todolist-api"
import { AppThunk } from "../store/store"
import { appActions } from "./app-slice"
import { todolistsActions, todolistsThunks } from "./todolists-slice"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "../utils"

// State
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((todolist) => {
          state[todolist.id] = []
        })
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.clearTodolist, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

// Thunk Creators
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.getTasks(todolistId)
    dispatch(appActions.setAppStatus({ status: "succeeded" }))
    return { todolistId, tasks: response.data.items }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string, title: string }>(`${slice.name}/addTask`, async (args, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.createTask(args.todolistId, args.title)
    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return { task: response.data.data.item }
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

const removeTask = createAppAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }>(`${slice.name}/removeTask`, async (args, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const response = await todolistsAPI.removeTask(args.todolistId, args.taskId)
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

const updateTask = createAppAsyncThunk<ArgsUpdateTask, ArgsUpdateTask>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI
  dispatch(appActions.setAppStatus({ status: "loading" }))

  try {
    const state = getState()
    const task = state.tasks[arg.todolistId].find((task) => task.id === arg.taskId)

    if (!task) {
      console.warn("task not found in the state");
      return rejectWithValue(null) // will be refactored
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...arg.domainModel
    }

    const response = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel)

    if (response.data.resultCode === ResultCode.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      return arg
    } else {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null) // will be refactored
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null) // will be refactored
  }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const { selectTasks } = slice.selectors
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask };