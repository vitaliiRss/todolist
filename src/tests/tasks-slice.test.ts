import { TaskPriorities, TaskStatuses } from "../api/todolist-api"
import { TasksStateType, tasksReducer, tasksThunks } from "../state/tasks-slice"
import { todolistsThunks } from "../state/todolists-slice"
import { SliceActrionType } from "./SliceActrionType"

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
  const action: SliceActrionType<typeof tasksThunks.removeTask.fulfilled> = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: "2"
    }
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test("correct task should be added to correct array", () => {
  const action: SliceActrionType<typeof tasksThunks.addTask.fulfilled> = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
      task: {
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
    }
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(0)
})

test("status of specified task should be changed", () => {
  const action: SliceActrionType<typeof tasksThunks.updateTask.fulfilled> = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      taskId: "2",
      domainModel: { status: TaskStatuses.New },
      todolistId: "todolistId2",
    }
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test("title of specified task should be changed", () => {
  const action: SliceActrionType<typeof tasksThunks.updateTask.fulfilled> = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: {
      taskId: "2",
      domainModel: { title: "beer" },
      todolistId: "todolistId2",
    }
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe("beer")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
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
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action: SliceActrionType<typeof todolistsThunks.removeTodolist.fulfilled> = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      todolistId: "todolistId2"
    }
  }
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const action: SliceActrionType<typeof todolistsThunks.fetchTodolists.fulfilled> = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload: {
      todolists: [
        { id: "1", title: "title 1", order: 0, addedDate: "" },
        { id: "2", title: "title 2", order: 0, addedDate: "" }
      ]
    }
  }

  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toBeDefined()
  expect(endState["2"]).toBeDefined()
})

test("tasks should be added for todolist", () => {
  const action: SliceActrionType<typeof tasksThunks.fetchTasks.fulfilled> = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: {
      todolistId: "todolistId3",
      tasks: [
        { id: "1", title: "REACT", todoListId: "todolistId1", status: TaskStatuses.New, priority: TaskPriorities.Low, description: "", order: 0, deadline: "", startDate: "", addedDate: "" },
        { id: "2", title: "REDUX", todoListId: "todolistId1", status: TaskStatuses.New, priority: TaskPriorities.Low, description: "", order: 0, deadline: "", startDate: "", addedDate: "" }
      ]
    }
  }
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(3)
  expect(endState["todolistId3"].length).toBe(2)
  expect(endState["todolistId3"][0].title).toBe("REACT")
  expect(endState["todolistId3"][1].title).toBe("REDUX")
})
