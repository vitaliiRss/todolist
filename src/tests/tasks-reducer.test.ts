import { TaskPriorities, TaskStatuses, TodolistType } from "../api/todolist-api"
import { TasksStateType,  tasksActions,  tasksReducer } from "../state/tasks-slice"
import { todolistsActions } from "../state/todolists-slice"

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: null,
        order: 1,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: null,
        order: 2,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: null,
        order: 3,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: null,
        order: 1,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: null,
        order: 2,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: null,
        order: 3,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ]
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, tasksActions.removeTask({ todolistId: "todolistId2", taskId: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: null,
        order: 1,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: null,
        order: 2,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: null,
        order: 3,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: null,
        order: 1,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: null,
        order: 3,
        priority: TaskPriorities.Low,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ]
  })
  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
})

test("correct task should be added to correct array", () => {
  const newTask = {
    id: "4",
    title: "juce",
    status: TaskStatuses.New,
    todoListId: "todolistId2",
    description: null,
    order: 4,
    priority: TaskPriorities.Low,
    startDate: null,
    deadline: null,
    addedDate: "2024-09-26T10:37:45.837"
  }

  const endState = tasksReducer(startState, tasksActions.addTask({task: newTask}))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(0)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(startState, tasksActions.updateTask({ todolistId: "todolistId2", taskId: "2", model: { status: TaskStatuses.New } }))

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(startState, tasksActions.updateTask({ todolistId: "todolistId2", taskId: "2", model: { title: "beer" } }))

  expect(endState["todolistId2"][1].title).toBe("beer")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "todolistId3",
    title: "New todolist",
    order: 2,
    addedDate: "2024-09-25T20:15:55.76"
  }

  const endState = tasksReducer(startState, todolistsActions.addTodolist({todolist: newTodolist}))

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {

  const endState = tasksReducer(startState, todolistsActions.removeTodolist({ todolistId: "todolistId2" }))
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const action = todolistsActions.setTodolists({
    todolists: [
      { id: "1", title: "title 1", order: 0, addedDate: "" },
      { id: "2", title: "title 2", order: 0, addedDate: "" }
    ]
  })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toBeDefined()
  expect(endState["2"]).toBeDefined()
})

test("tasks should be added for todolist", () => {
  const action = tasksActions.setTasks( {
    todolistId: "todolistId3",
    tasks: [
      {
        id: "1",
        title: "REACT",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        description: "",
        order: 0,
        deadline: "",
        startDate: "",
        addedDate: "",
        todoListId: "todolistId1"
      },
      {
        id: "2",
        title: "REDUX",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        description: "",
        order: 0,
        deadline: "",
        startDate: "",
        addedDate: "",
        todoListId: "todolistId1"
      }
    ]
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(3)
  expect(endState["todolistId3"].length).toBe(2)
  expect(endState["todolistId3"][0].title).toBe("REACT")
  expect(endState["todolistId3"][1].title).toBe("REDUX")
})
