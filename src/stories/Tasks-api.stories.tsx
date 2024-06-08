import React, { useEffect, useState } from "react"
import { UpdateTaskModelType, todolistsAPI } from "../api/todolist-api"

export default {
  title: "API/Task",
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")
  useEffect(() => {

    const todolistId = "b67ac3de-87ac-432b-ae66-28d741729e16"

    todolistsAPI.getTasks(todolistId).then(response => {
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

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const todolistId = "b67ac3de-87ac-432b-ae66-28d741729e16"
    const title = "new task"

    todolistsAPI.createTask(todolistId, title).then(response => {
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

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const todolistId = "980dc1a6-c651-4c13-9c46-42cdbe6359b3"
    const taskId = "030e6428-d7db-4c13-99b7-b74ed3299aea"
    const model: UpdateTaskModelType = {
      title: "task 7",
      description: null,
      status: 0,
      priority: 1,
      startDate: null,
      deadline: null
    }

    todolistsAPI.updateTask(todolistId, taskId, model).then(response => {
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

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [error, setError] = useState<any>("")

  useEffect(() => {
    const todolistId = "b67ac3de-87ac-432b-ae66-28d741729e16"
    const taskId = "ec1c62e0-3c82-428f-8229-5448ede74e56"

    todolistsAPI.removeTask(todolistId, taskId).then(response => {
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