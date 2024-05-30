import { TodolistType } from "../api/todolist-api"
import { RequestStatusType } from "../state/app-slice"
import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsReducer } from "../state/todolists-slice"

let startState: TodolistDomainType[]

beforeEach(() => {
  startState = [
    { id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "2024-04-25T20:15:55.76", order: 0 },
    { id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "2024-05-25T20:15:55.76", order: 1 }
  ]
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, todolistsActions.removeTodolist({ todolistId: "todolistId1" }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("todolistId2")
})

test("correct todolist should be added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "New todolist",
    order: 2,
    addedDate: "2024-09-25T20:15:55.76"
  }

  const endState = todolistsReducer(startState, todolistsActions.addTodolist({ todolist: newTodolist }))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New todolist")
})

test("correct todolist should change its name", () => {
  const endState = todolistsReducer(startState, todolistsActions.changeTodolistTitle({ todolistId: "todolistId2", title: "New Todolist" }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {

  const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilter({ todolistId: "todolistId2", filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})

test("todolists should be set to the state", () => {
  const endState = todolistsReducer([], todolistsActions.setTodolists({ todolists: startState }))

  expect(endState.length).toBe(2)
})

test("correct entity status of todolist should be changed", () => {
  const endState = todolistsReducer(startState, todolistsActions.changeTodolistEntityStatus({ todolistId: "todolistId2", status: "loading" }))

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe("loading")
})
