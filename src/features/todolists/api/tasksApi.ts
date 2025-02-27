import { instance } from "@/common/instance/instance.ts"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get(`/todo-lists/${todolistId}/tasks`)
  },
}
