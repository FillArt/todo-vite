import { TodoListItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodoListItem.tsx"
import Paper from "@mui/material/Paper"
// import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
// import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"

type TodolistProps = {
  todolists: TodoListApi[]

  deleteTodo: (idTodo: string) => void
  changeTodoTitle: (idTodo: string, title: string) => void
}

export const Todolists = ({ todolists, deleteTodo, changeTodoTitle }: TodolistProps) => {
  // const todolist = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((todo) => {
        return (
          <Paper key={todo.id} sx={{ p: "20px 20px 20px 20px" }}>
            <TodoListItem todo={todo} deleteTodo={deleteTodo} changeTodoTitle={changeTodoTitle} />
          </Paper>
        )
      })}
    </>
  )
}
