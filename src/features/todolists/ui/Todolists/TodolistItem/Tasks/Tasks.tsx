import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useEffect, useState } from "react"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  id: string
}

export const Tasks = ({ id }: Props) => {
  // const tasks = useAppSelector(selectTasks)[id]
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    tasksApi.getTasks(id).then((res) => {
      setTasks(res.data.items)
    })
  }, [])

  let filteredTasks = tasks

  console.log(tasks)

  // if (filter === "active") {
  //   filteredTasks = tasks.filter((i) => !i.isDone)
  // }
  // if (filter === "completed") {
  //   filteredTasks = tasks.filter((i) => i.isDone)
  // }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => {
            return <TaskItem id={id} task={task} />
          })}
        </List>
      )}
    </>
  )
}
