import { instance } from "@/common/instance/instance.ts"
import { BaseResponse, TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodoListApi[]>("/todo-lists")
  },
  deleteTodoLists(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
  createTodoList(title: string) {
    return instance.post<BaseResponse<{ item: TodoListApi }>>("/todo-lists", { title })
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
}
