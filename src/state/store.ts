import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { combineReducers, compose, legacy_createStore } from 'redux';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancers());
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;