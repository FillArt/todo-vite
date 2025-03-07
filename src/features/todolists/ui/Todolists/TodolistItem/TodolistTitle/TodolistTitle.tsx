import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { ButtonBase } from "@/assets/components/ButtonBase.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
// import {CreateTodolistResponse} from "@/features/todolists/api/todolistsApi.types.ts";

type Props = {
  id: string
  title: string

  deleteTodo: (idTodo: string) => void
  changeTodoTitle: (idTodo: string, title: string) => void
}

export const TodolistTitle = ({ id, title, deleteTodo, changeTodoTitle }: Props) => {
  const dispatch = useAppDispatch()

  // const deleteTodoListsApi = (id: string) => {
  //   todolistsApi.deleteTodoLists(id).then((r) => console.log(r.data))
  // }
  // //
  // const changeTodolistTitleApi = (id: string, title: string) => {
  //   todolistsApi.changeTodolistTitle(id, title).then((res) => console.log(res.data))
  // }

  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }))
    // changeTodolistTitleApi(id, title)
    changeTodoTitle(id, title)
  }

  const deleteTodoList = (todoId: string) => {
    dispatch(deleteTodolistAC({ id: todoId }))
    deleteTodo(todoId)
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <EditableSpan value={title} onChange={changeTodoListTitle} />
      <ButtonBase onClick={() => deleteTodoList(id)} color={"error"} style={"text"}>
        <DeleteIcon />
      </ButtonBase>
    </div>
  )
}
