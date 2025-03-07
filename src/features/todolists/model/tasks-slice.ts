import { createSlice, nanoid } from "@reduxjs/toolkit"
import { TasksState } from "@/app/App.tsx"
import { createTodolistAC, deleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
  reducers: (create) => ({
    createTaskAC: create.preparedReducer(
      (todoId: string, title: string) => ({
        payload: {
          newTask: { id: nanoid(), title, isDone: false },
          todoId,
        },
      }),
      (state, action) => {
        state[action.payload.todoId].unshift(action.payload.newTask)
      },
    ),
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

export const taskReducer = tasksSlice.reducer
export const { createTaskAC, deleteTaskAC, changeStatusTaskAC, changeTitleTaskAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
