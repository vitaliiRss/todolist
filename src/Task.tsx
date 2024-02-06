import { Button } from "./Button";

type TaskPropsType = {
  id: number,
  title: string;
  isDone: boolean;
  classes?: string;
  removeTask: (taskId: number) => void
};

export function Task({id, title, isDone, classes, removeTask }: TaskPropsType) {
  return (
    <div className={classes}>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
      <Button onClickHandler={() => removeTask(id)} title={"x"} />
    </div>
  );
}
