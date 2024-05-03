import { AddTodolistACType, RemoveTodolistACType, SetTodolistsACACType } from "./todolists-reducer";
import { TaskType, UpdateTaskModelType, todolistsAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

type TasktActionsType = SetTodolistsACACType
  | AddTodolistACType
  | RemoveTodolistACType
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasktActionsType): TasksStateType => {
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
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.getTasks(todolistId)
    .then((response) => {
      dispatch(setTasksAC(todolistId, response.data.items))
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(title, todolistId)
    .then((response) => {
      dispatch(addTaskAC(response.data.data.item))
    })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then((response) => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks
    const task = tasks[todolistId].find(t => t.id === taskId)

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

    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(response => {
        dispatch(updateTaskAC(todolistId, taskId, apiModel))
      })
  }