import React, { useEffect, useState } from "react"
import { todolistAPI } from "../api/todolist-api"

export default {
  title: "API/Todolist",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    todolistAPI.getTodolists().then(response => {
      setState(response.data)
    }).catch(error => {
      setError(error.message)
    })
  }, [])

  return (
    <div>
      <pre>
        {error ? (
          JSON.stringify(error, undefined, 2)
        ) : (
          JSON.stringify(state, undefined, 2)
        )}
      </pre>
    </div>
  )
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const title = "test todolist"

    todolistAPI.createTodolist(title).then(response => {
      setState(response.data)
    }).catch(error => {
      setError(error.message)
    })
  }, [])

  return (
    <div>
      <pre>
        {error ? (
          JSON.stringify(error, undefined, 2)
        ) : (
          JSON.stringify(state, undefined, 2)
        )}
      </pre>
    </div>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const todolistId = "8a1a0a84-441d-48e8-b674-438ab68c2b85"

    todolistAPI.deleteTodolist(todolistId).then(response => {
      setState(response.data)
    }).catch(error => {
      setError(error.message)
    })
  }, [])

  return (
    <div>
      <pre>
        {error ? (
          JSON.stringify(error, undefined, 2)
        ) : (
          JSON.stringify(state, undefined, 2)
        )}
      </pre>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const todolistId = "980dc1a6-c651-4c13-9c46-42cdbe6359b3"
    const title = "update test todolist"

    todolistAPI.updateTodolist(todolistId, title).then(response => {
      setState(response.data)
    }).catch(error => {
      setError(error.message)
    })
  }, [])

  return (
    <div>
      <pre>
        {error ? (
          JSON.stringify(error, undefined, 2)
        ) : (
          JSON.stringify(state, undefined, 2)
        )}
      </pre>
    </div>
  )
}