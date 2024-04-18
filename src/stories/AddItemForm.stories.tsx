import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions'
import { AddItemForm, AddItemFormPropsType } from "../AddItemForm";
import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: {
      description: 'Button clicked inside form'
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {};

const AddItemFormError = memo((props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>("Title is required")

  const addItem = () => {
    if (title.trim() !== "") {
      props.onClick(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) setError(null);
    if (event.key === "Enter") addItem()
  }

  return (
    <Stack direction="row" alignItems="start" spacing={1}>
      <TextField
        id={props.id}
        label={error ? error : "type something..."}
        variant="outlined"
        size="small"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
      />
      <IconButton aria-label="delete" onClick={addItem}>
        <AddIcon />
      </IconButton>
    </Stack>
  )
})

export const AddItemFormErrorStory: Story = {
  render: () => <AddItemFormError onClick={action("Button clicked")} id={"111"} />
}