import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";
import { Task } from "./Task";

type TaskListPropsType = {
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const TaskList = ({ tasks, removeTask, changeFilter }: TaskListPropsType) => {
  const taskList = <ul>
    {
      tasks.map(task => {
        return (
          <li key={task.id}>
            <Task id={task.id}
                  isDone={task.isDone}
                  title={task.title}
                  removeTask={removeTask} />
          </li>
        )
      })
    }
  </ul>

  return (
    <>
      {taskList}
      <div>
        <Button onClickHandler={() => changeFilter("all")} title="All" />
        <Button onClickHandler={() => changeFilter("active")} title="Active" />
        <Button onClickHandler={() => changeFilter("completed")} title="Completed" />
      </div>
    </>
  );
};
