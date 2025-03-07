// import {Todolist} from "@/app/App.tsx";
import "@/app/App.css"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { createTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"

type TodoListProps = {
  todo: TodoListApi
}

export const TodoListItem = ({ todo: { id, title } }: TodoListProps) => {
  const dispatch = useAppDispatch()
  const createTaskHandler = (title: string) => dispatch(createTaskAC(id, title))

  return (
    <div>
      <TodolistTitle id={id} title={title} />
      <CreateItemForm onCreate={createTaskHandler} />
      <Tasks id={id} />
      {/*<FilterButtons id={id} filter={filter} />*/}
    </div>
  )
}
