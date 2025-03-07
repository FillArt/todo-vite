import { createSlice, current, nanoid } from "@reduxjs/toolkit"
import { Filter } from "@/app/App.tsx"
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"

export type DomainTodolist = TodoListApi & {
  filter: Filter
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { id: nanoid(), title, addedDate: "", order: 0 } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all" })
        console.log(current(state))
      },
    ),
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const todo = state.find((item) => item.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: Filter }>((state, action) => {
      const todo = state.find((item) => item.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    }),
  }),
})

export const { createTodolistAC, deleteTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
