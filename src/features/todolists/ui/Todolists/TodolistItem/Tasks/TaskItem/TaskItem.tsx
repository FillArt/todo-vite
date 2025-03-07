// import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { ButtonBase } from "@/assets/components/ButtonBase.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { Task } from "@/app/App.tsx"
import { changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getListItemSx } from "@/TodolistItem.styles.ts"

type Props = {
  id: string
  task: Task
}

export const TaskItem = ({ id, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskAC({ idTodo: id, idTask: task.id }))
  }

  const changeTaskStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusTaskAC({ idTodo: id, idTask: task.id, isDone: event.currentTarget.checked }))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTitleTaskAC({ idTodo: id, idTask: task.id, title }))
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)} className={task.isDone ? "is-done" : ""}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>

      <ButtonBase onClick={() => deleteTask()} color={"error"} style={"text"}>
        <DeleteIcon />
      </ButtonBase>
    </ListItem>
  )
}
