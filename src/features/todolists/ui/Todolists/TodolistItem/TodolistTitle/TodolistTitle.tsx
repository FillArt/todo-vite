import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { ButtonBase } from "@/assets/components/ButtonBase.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-reducer-RTK.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
// import {CreateTodolistResponse} from "@/features/todolists/api/todolistsApi.types.ts";

type Props = {
  id: string
  title: string
}

export const TodolistTitle = ({ id, title }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodoListsApi = (id: string) => {
    todolistsApi.deleteTodoLists(id).then((r) => console.log(r.data))
  }

  const changeTodolistTitleApi = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then((res) => console.log(res.data))
  }

  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }))
    changeTodolistTitleApi(id, title)
  }

  const deleteTodoList = (todoId: string) => {
    dispatch(deleteTodolistAC({ id: todoId }))
    deleteTodoListsApi(todoId)
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
