import { TasksStateType } from "../App";
import { tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
  startState = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: 0,
        todoListId: "1",
        description: null,
        order: 1,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "JS",
        status: 2,
        todoListId: "1",
        description: null,
        order: 2,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "React",
        status: 0,
        todoListId: "1",
        description: null,
        order: 3,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ],
    "todolistId2": [
      {
        id: "1",
        title: "bread",
        status: 0,
        todoListId: "1",
        description: null,
        order: 1,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "milk",
        status: 2,
        todoListId: "1",
        description: null,
        order: 2,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        todoListId: "1",
        description: null,
        order: 3,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ]
  };
})

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC("todolistId2", "2");
  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: 0,
        todoListId: "1",
        description: null,
        order: 1,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "2",
        title: "JS",
        status: 2,
        todoListId: "1",
        description: null,
        order: 2,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "React",
        status: 0,
        todoListId: "1",
        description: null,
        order: 3,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ],
    "todolistId2": [
      {
        id: "1",
        title: "bread",
        status: 0,
        todoListId: "1",
        description: null,
        order: 1,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      },
      {
        id: "3",
        title: "tea",
        status: 0,
        todoListId: "1",
        description: null,
        order: 3,
        priority: 0,
        startDate: null,
        deadline: null,
        addedDate: "2024-04-26T10:37:45.837"
      }
    ]
  });
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
})

test('correct task should be added to correct array', () => {
  const action = addTaskAC("juce", "todolistId2");
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(0);
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC("todolistId2", "2", 0);
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(2);
  expect(endState["todolistId2"][1].status).toBe(0);
})

test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC("todolistId2", "2", 'beer');
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('beer')
  expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC("new todolist");
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
})