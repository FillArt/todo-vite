// import {Todolist} from "@/app/App.tsx";
import "@/app/App.css"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { createTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
// import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
// import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { useEffect, useState } from "react"
import { BaseTask } from "@/features/todolists/api/tasksApi.types.ts"

type TodoListProps = {
  todo: TodoListApi

  deleteTodo: (idTodo: string) => void
  changeTodoTitle: (idTodo: string, title: string) => void
}

export const TodoListItem = ({ todo: { id, title }, deleteTodo, changeTodoTitle }: TodoListProps) => {
  const dispatch = useAppDispatch()
  const [tasks, setTasks] = useState<BaseTask[]>([])

  const createTask = async (title: string) => {
    dispatch(createTaskAC({ idTodo: id, title }))
    await tasksApi.createTask(id, title)
    const response = await tasksApi.getTasks(id)
    console.log(response.data.items, "HEEEEELOOOO")
    setTasks(response.data.items)
  }

  useEffect(() => {
    console.log(tasks, "TASKS - массив")
  }, [tasks])

  return (
    <div>
      <TodolistTitle id={id} title={title} deleteTodo={deleteTodo} changeTodoTitle={changeTodoTitle} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks id={id} />
      {/*<FilterButtons id={id} filter={filter} />*/}
    </div>
  )
}
