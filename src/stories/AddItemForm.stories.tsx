import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions"
import { AddItemForm, AddItemFormPropsType } from "../components/AddItemForm/AddItemForm";
import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "Button clicked inside form"
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

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
  render: () => <AddItemFormError onClick={action("Button clicked")} />
}
