import { TasksStateType, tasksReducer } from "./tasks-reducer";
import { todolistsReducer, addTodolistAC, TodolistDomainType } from "./todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistDomainType[] = [];

  const newTodolist: TodolistDomainType = {
    id: "todolistId3",
    title: "New todolist",
    filter: 'all',
    entityStatus: "idle",
    order: 2,
    addedDate: "2024-09-25T20:15:55.76"
  }

  const action = addTodolistAC(newTodolist);

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolist.id);
  expect(idFromTodolists).toBe(action.todolist.id);
});