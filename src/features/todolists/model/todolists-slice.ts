import { createAsyncThunk } from "@reduxjs/toolkit"
import { Filter } from "@/app/App.tsx"
import { TodoListApi } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"

export type DomainTodolist = TodoListApi & {
  filter: Filter
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      // .addCase(createTodolistsTC.fulfilled, (state, action) => {
      //   state.push({ ...action.payload.data.item, filter: "all" })
      // })
      .addCase(deleteTodolistsTC.fulfilled, (state, action) => {
        const index = state.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todo = state.find((item) => item.id === action.payload.id)
        if (todo) {
          todo.title = action.payload.title
        }
      })
  },
  reducers: (create) => ({
    fetchTodolistsTC: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const res = await todolistsApi.getTodolists()
          return { todolists: res.data }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (state.length) {
            state = []
            action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all" })
            })
          } else {
            action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all" })
            })
          }
        },
      },
    ),
    createTodolistsTC: create.asyncThunk(
      async (payload: { title: string }, thunkAPI) => {
        try {
          const res = await todolistsApi.createTodoList(payload.title)
          return res.data
        } catch (e) {
          return thunkAPI.rejectWithValue(e)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({ ...action.payload.data.item, filter: "all" })
        },
      },
    ),

    changeTodolistFilterAC: create.reducer<{ id: string; filter: Filter }>((state, action) => {
      const todo = state.find((item) => item.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    }),
  }),
})

// export const createTodolistsTC = createAsyncThunk(
//   `${todolistsSlice.name}/createTodolistsTC`,
//   async (title: string, thunkAPI) => {
//     try {
//       const res = await todolistsApi.createTodoList(title)
//       return res.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   },
// )

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

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload.id, payload.title)
      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolistsTC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
