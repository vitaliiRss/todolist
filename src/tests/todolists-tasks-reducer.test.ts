import { TasksStateType, tasksReducer } from "../state/tasks-slice"
import { TodolistDomainType, todolistsActions, todolistsReducer } from "../state/todolists-slice"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: TodolistDomainType[] = []

  const newTodolist = {
    id: "todolistId3",
    title: "New todolist",
    filter: "all",
    entityStatus: "idle",
    order: 2,
    addedDate: "2024-09-25T20:15:55.76"
  }

  const action = todolistsActions.addTodolist({ todolist: newTodolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
