import axios, { AxiosResponse } from "axios"
import { LoginType } from "../features/Login/Login"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "d85fbee1-9491-4661-ab7f-9f9f33b0f108"
  }
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<T = {}> = {
  resultCode: 0,
  fieldsErrors: string[]
  messages: string[],
  data: T
}

export enum ResultCode {
  SUCCESS = 0,
  ERROR = 1,
  RECAPTCHA_ERROR = 10
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string | null
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModelType = {
  title?: string
  description?: string | null
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string | null
  deadline?: string | null
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

type UserType = {
  id: number,
  email: string,
  login: string
}

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, { title })
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(title: string, todolistId: string) {
    return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`todo-lists/${todolistId}/tasks`, { title });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  }
}

export const authAPI = {
  me: () => {
    return instance.get<ResponseType<UserType>>("/auth/me")
  },
  login: (data: LoginType) => {
    return instance.post<ResponseType<{ userId: number }>>("/auth/login", data)
  },
  logOut: () => {
    return instance.delete<ResponseType>("/auth/login")
  }
}
