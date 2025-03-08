import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  id: string
}

export const Tasks = ({ id }: Props) => {
  const tasks = useAppSelector(selectTasks)[id]
  // const [filter, setFilter] = useState("all")
  let filteredTasks = tasks
  // if (filter === "active") {
  //   filteredTasks = tasks.filter((i) => !i.isDone)
  // }
  // if (filter === "completed") {
  //   filteredTasks = tasks.filter((i) => i.isDone)
  // }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task, index) => {
            return <TaskItem key={index} id={id} task={task} />
          })}
        </List>
      )}
    </>
  )
}
