import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { ButtonBase } from "@/assets/components/ButtonBase.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, deleteTodolistsTC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type Props = {
  id: string
  title: string
}

export const TodolistTitle = ({ id, title }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodoListTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  const deleteTodoList = (todoId: string) => {
    dispatch(deleteTodolistsTC({ id: todoId }))
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
