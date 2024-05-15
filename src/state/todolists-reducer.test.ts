import { v1 } from 'uuid';
import { todolistsReducer, addTodolistAC, removeTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, TodolistDomainType, setTodolistsAC, changeTodolistEntityStatusAC } from "./todolists-reducer";
import { TodolistType } from "../api/todolist-api";
import { RequestStatusType } from "./app-reducer";

let startState: TodolistDomainType[]

beforeEach(() => {
  startState = [
    { id: 'todolistId1', title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "2024-04-25T20:15:55.76", order: 0 },
    { id: 'todolistId2', title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "2024-05-25T20:15:55.76", order: 1 }
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC('todolistId1'))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('todolistId2');
});

test('correct todolist should be added', () => {
  const newTodolist: TodolistType = {
    id: "todolistId3",
    title: "New todolist",
    order: 2,
    addedDate: "2024-09-25T20:15:55.76"
  }

  const endState = todolistsReducer(startState, addTodolistAC(newTodolist))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("New todolist");
});

test('correct todolist should change its name', () => {
  let newTodolistTitle = "New Todolist";

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: 'todolistId2',
    title: newTodolistTitle
  };

  const endState = todolistsReducer(startState, changeTodolistTitleAC(action.id, action.title));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = "completed";

  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: 'todolistId2',
    filter: newFilter
  };

  const endState = todolistsReducer(startState, changeTodolistFilterAC(action.id, action.filter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {
  const action = setTodolistsAC(startState);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {

  let newStatus: RequestStatusType = 'loading'

  const endState = todolistsReducer(startState, changeTodolistEntityStatusAC('todolistId2', newStatus))

  expect(endState[0].entityStatus).toBe('idle')
  expect(endState[1].entityStatus).toBe(newStatus)
})