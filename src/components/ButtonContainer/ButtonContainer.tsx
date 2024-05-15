import React, { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

type MyButtonPropsType = {} & ButtonProps

export const ButtonContainer = memo((props: MyButtonPropsType) => {
  return (
    <Button variant={props.variant} onClick={props.onClick} {...props}>{props.title}</Button>
  )
})