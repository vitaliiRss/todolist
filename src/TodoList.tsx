
import { TodoListHeader } from "./TodoListHeader";
import { AddTaskForm } from "./AddTaskForm";
import { TaskList } from "./TaskList";
import { FilterValuesType, TaskType } from "./App";

type TodoListPropsType = {
  todoListTitle: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export function TodoList({todoListTitle, tasks, removeTask, changeFilter}: TodoListPropsType) {
  return (
      <div className="todolist">
          <TodoListHeader title={todoListTitle} />
          <AddTaskForm />
          <TaskList tasks={tasks} removeTask={removeTask} changeFilter={changeFilter} />
      </div>
  )
}
