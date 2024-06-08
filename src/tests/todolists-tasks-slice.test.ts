import { TodolistType } from "../api/todolist-api"
import { TasksStateType, tasksReducer } from "../state/tasks-slice"
import { TodolistDomainType, todolistsReducer, todolistsThunks } from "../state/todolists-slice"
import { SliceActrionType } from "./SliceActrionType"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []
  // const startTodolistsState: TodolistType[] = []

  const action: SliceActrionType<typeof todolistsThunks.addTodolist.fulfilled> = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: "todolistId3",
        title: "New todolist",
        order: 2,
        addedDate: "2024-09-25T20:15:55.76",
        // filter: "all",
        // entityStatus: "idle"
      }
    }
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
