import { TodolistDomainType, todolistsActions, todolistsReducer, todolistsThunks } from "../state/todolists-slice"
import { SliceActrionType } from "./SliceActrionType"

let startState: TodolistDomainType[]

beforeEach(() => {
  startState = [
    { id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "2024-04-25T20:15:55.76", order: 0 },
    { id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "2024-05-25T20:15:55.76", order: 1 }
  ]
})

test("correct todolist should be added", () => {
  const action: SliceActrionType<typeof todolistsThunks.addTodolist.fulfilled> = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: "todolistId3",
        title: "New todolist",
        order: 2,
        addedDate: "2024-09-25T20:15:55.76"
      }
    }
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New todolist")
})

test("correct todolist should be removed", () => {
  const action: SliceActrionType<typeof todolistsThunks.removeTodolist.fulfilled> = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      todolistId: "todolistId1"
    }
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("todolistId2")
})

test("correct todolist should change his own name", () => {
  const action: SliceActrionType<typeof todolistsThunks.changeTodolistTitle.fulfilled> = {
    type: todolistsThunks.changeTodolistTitle.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      title: "New Todolist"
    }
  }
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const action = todolistsActions.changeTodolistFilter({ todolistId: "todolistId2", filter: "completed" })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})

test("todolists should be set to the state", () => {
  const action = todolistsActions.changeTodolistEntityStatus({ todolistId: "todolistId2", status: "idle" })
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(2)
})

test("correct entity status of todolist should be changed", () => {
  const endState = todolistsReducer(startState, todolistsActions.changeTodolistEntityStatus({ todolistId: "todolistId2", status: "loading" }))

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe("loading")
})
