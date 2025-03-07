import { instance } from "@/common/instance/instance.ts"
import { BaseTask } from "@/features/todolists/api/tasksApi.types.ts"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<BaseTask[]>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseTask[]>(`/todo-lists/${todolistId}/tasks`, { title })
  },
}
