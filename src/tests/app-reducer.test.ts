import { AppStateType, appReducer, setAppStatusAC, setErrorAC } from "../state/app-reducer";

let startState: AppStateType

beforeEach(() => {
  startState = {
    isInitialized: false,
    error: null,
    status: "idle"
  }
})

test("correct status should be set", () => {
  const endState = appReducer(startState, setAppStatusAC("loading"));

  expect(endState.error).toBe(null);
  expect(endState.status).toBe("loading");
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, setErrorAC("Error message"));

  expect(endState.error).toBe("Error message");
  expect(endState.status).toBe("idle");
})

