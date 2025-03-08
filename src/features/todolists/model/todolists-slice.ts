import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Filter } from "@/app/App.tsx"
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export type DomainTodolist = TodoListApi & {
  filter: Filter
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((tl) => {
          if (!state.some((t) => t.id === tl.id)) {
            state.push({ ...tl, filter: "all" })
          }
        })
      })
      .addCase(createTodolistsTC.fulfilled, (state, action) => {
        state.push({ ...action.payload.data.item, filter: "all" })
      })
      .addCase(deleteTodolistsTC.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
  reducers: (create) => ({
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

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistsTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodoList(title)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const deleteTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistsTC`,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodoLists(payload.id)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const { changeTodolistFilterAC, changeTodolistTitleAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
