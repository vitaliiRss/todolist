import React, { ChangeEvent, useState } from "react";
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditableSpan } from "../components/EditableSpan/EditableSpan";
import '../index.css';

const meta: Meta<typeof EditableSpan> = {
  title: 'TODOLISTS/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    oldTitle: "HTML",
    status: 0,
    onClick: fn()
  }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  render: (args) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(args.oldTitle)

    const activateEditMode = () => {
      setEditMode(true);
      setNewTitle(newTitle);
    }

    const activateViewMode = () => {
      setEditMode(false);
      args.onClick(newTitle);
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.currentTarget.value)
    }

    return (
      editMode
        ?
        <input type="text" value={newTitle} onBlur={activateViewMode} onChange={onChangeHandler} autoFocus />
        :
        <span onDoubleClick={activateEditMode} className={args.status ? "task-done task" : "task"}>{newTitle}</span>

    )
  }
}