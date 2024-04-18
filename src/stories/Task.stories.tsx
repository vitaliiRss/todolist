import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from "react";
import { fn } from '@storybook/test';
import { Task } from "../Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    task: { id: "2121232", title: "JS", isDone: true },
    todolistId: "dsdsdasd3",
    removeTask: fn(),
    changeTaskStatus: fn(),
    changeTaskTitle: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
  args: {
    task: { id: "2121232", title: "HTML", isDone: false },
  }
};

export const TaskToggleStory: Story = {
  render: (args) => {
    const [task, setTask] = useState(args.task)

    function changeTaskStatus() {
      setTask({ ...task, isDone: !task.isDone })
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
      setTask({ ...task, title: title })
    }

    return (
      <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={args.removeTask} task={task} todolistId={"dsadasd2344"} />
    )
  }
}
