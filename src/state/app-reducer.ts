export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>
export type SetInitializedACType = ReturnType<typeof setInitializedAC>

type AppActionsType = SetAppStatusACType | SetErrorACType | SetInitializedACType

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type AppStateType = {
  isInitialized: boolean
  status: RequestStatusType
  error: string | null
}

const initialState: AppStateType = {
  isInitialized: false,
  status: "idle",
  error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case "APP/SET-STATUS": {
      return { ...state, status: action.status }
    }
    case "APP/SET-ERROR": {
      return { ...state, error: action.error }
    }
    case "APP/SET-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}

// Action Creators
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status
  } as const
}

export const setErrorAC = (error: string | null) => {
  return {
    type: "APP/SET-ERROR",
    error
  } as const
}

export const setInitializedAC = (isInitialized: boolean) => {
  return {
    type: "APP/SET-INITIALIZED",
    isInitialized
  } as const
}