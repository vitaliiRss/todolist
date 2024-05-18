import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Task } from "../features/Task/Task";

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    task: { id: "1", title: "CSS", status: 0, todoListId: "1", description: null, order: 1, priority: 0, startDate: null, deadline: null, addedDate: "2024-04-26T10:37:45.837" },
    todolistId: "dsdsdasd3",
    removeTask: fn(),
    changeTaskStatus: fn(),
    changeTaskTitle: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "2", title: "HTML", status: 2, todoListId: "1", description: null, order: 1, priority: 0, startDate: null, deadline: null, addedDate: "2024-05-26T10:37:45.837" }
  }
};

export const TaskIsNotDoneStory: Story = {}

export const TaskToggleStory: Story = {
  render: (args) => {
    const [task, setTask] = useState(args.task)

    function changeTaskStatus() {
      setTask({ ...task, status: !task.status ? 2 : 0 })
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
      setTask({ ...task, title: title })
    }

    return (
      <Task
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        removeTask={args.removeTask}
        task={task}
        todolistId={"dsadasd2344"} />
    )
  }
}
