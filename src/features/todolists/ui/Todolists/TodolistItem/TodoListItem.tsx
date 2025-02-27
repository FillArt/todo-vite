// import {Todolist} from "@/app/App.tsx";
import "@/app/App.css"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { createTaskAC } from "@/features/todolists/model/tasks-reducer-RTK.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
// import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
// import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"

type TodoListProps = {
  todo: TodoListApi

  deleteTodo: (idTodo: string) => void
  changeTodoTitle: (idTodo: string, title: string) => void
}

export const TodoListItem = ({ todo: { id, title }, deleteTodo, changeTodoTitle }: TodoListProps) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ idTodo: id, title }))
  }

  return (
    <div>
      <TodolistTitle id={id} title={title} deleteTodo={deleteTodo} changeTodoTitle={changeTodoTitle} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks id={id} />
      {/*<FilterButtons id={id} filter={filter} />*/}
    </div>
  )
}
