import { TodoListItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodoListItem.tsx"
import Paper from "@mui/material/Paper"
import { useAppSelector } from "@/common/hooks"
import { selectTodolists } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  console.log(todolists, "Lol")
  return (
    <>
      {todolists.map((todo) => {
        return (
          <Paper key={todo.id} sx={{ p: "20px 20px 20px 20px" }}>
            <TodoListItem todo={todo} />
          </Paper>
        )
      })}
    </>
  )
}
