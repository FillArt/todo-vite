import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TasksState } from "@/app/App.tsx"
import { createTodolistsTC, deleteTodolistsTC } from "@/features/todolists/model/todolists-slice.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { createAppSlice } from "@/common/utils"

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistsTC.fulfilled, (state, action) => {
        state[action.payload.data.item.id] = []
      })
      .addCase(deleteTodolistsTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTaskTC.fulfilled, (state, action) => {
        // console.log(action.payload.data.item)
      })
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        try {
          const res = await tasksApi.getTasks(todolistId)
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          return thunkAPI.rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    // createTaskAC: create.preparedReducer(
    //   (todoId: string, title: string) => ({
    //     payload: {
    //       newTask: { id: nanoid(), title, isDone: false },
    //       todoId,
    //     },
    //   }),
    //   (state, action) => {
    //     state[action.payload.todoId].unshift(action.payload.newTask)
    //   },
    // ),
    deleteTaskAC: create.reducer<{ todoId: string; taskId: string }>((state, action) => {
      if (state[action.payload.todoId]) {
        state[action.payload.todoId] = state[action.payload.todoId].filter((item) => item.id !== action.payload.taskId)
      }
    }),
    changeStatusTaskAC: create.reducer<{ todoId: string; taskId: string; isDone: boolean }>((state, action) => {
      const { todoId, taskId, isDone } = action.payload
      const task = state[todoId].find((task) => task.id === taskId)

      if (task) {
        task.isDone = isDone
      }
    }),
    changeTitleTaskAC: create.reducer<{ todoId: string; taskId: string; title: string }>((state, action) => {
      const { todoId, taskId, title } = action.payload
      const task = state[todoId].find((task) => task.id === taskId)

      if (task) {
        task.title = title
      }
    }),
  }),
})

export const createTaskTC = createAsyncThunk(
  `${tasksSlice.name}/createTaskTC`,
  async (payload: { todoId: string; title: string }, thunkAPI) => {
    try {
      const res = await tasksApi.createTask(payload.todoId, payload.title)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const taskReducer = tasksSlice.reducer
export const { deleteTaskAC, changeStatusTaskAC, changeTitleTaskAC, fetchTasksTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
