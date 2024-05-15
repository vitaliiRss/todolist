export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetErrorACType = ReturnType<typeof setErrorAC>

type AppActionsType = SetAppStatusACType | SetErrorACType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
  status: RequestStatusType
  error: string | null
}

const initialState: AppStateType = {
  status: 'idle',
  error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}

// Action Creators
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    status
  } as const
}

export const setErrorAC = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    error
  } as const
} 