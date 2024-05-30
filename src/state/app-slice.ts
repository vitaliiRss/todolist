import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

// State
type AppStateType = {
  isInitialized: boolean
  status: RequestStatusType
  error: string | null
}

const initialState: AppStateType = {
  isInitialized: false,
  status: "idle",
  error: null
}

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  },
  selectors: {
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized
  }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectError, selectIsInitialized, selectStatus } = slice.selectors
export type InitialStateApp = ReturnType<typeof slice.getInitialState>
