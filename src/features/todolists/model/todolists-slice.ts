import { createSlice, nanoid } from "@reduxjs/toolkit"
import { Filter, Todolist } from "@/app/App.tsx"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { id: nanoid(), title, addedDate: "", order: 0 } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all" })
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
