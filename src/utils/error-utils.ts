import { Dispatch } from "redux"
import { SetAppStatusACType, SetErrorACType, setAppStatusAC } from "../state/app-reducer"
import { ResponseType } from "../api/todolist-api"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorACType | SetAppStatusACType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = <T>(error: T, dispatch: Dispatch<SetErrorACType | SetAppStatusACType>) => {
  dispatch(setAppErrorAC((error as Error).message))
  dispatch(setAppStatusAC('failed'))
}
function setAppErrorAC(arg0: any): any {
  throw new Error("Function not implemented.")
}

