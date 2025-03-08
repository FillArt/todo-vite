import { configureStore } from "@reduxjs/toolkit"
import { appSlice } from "@/app/app-slice.ts"
import { todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { tasksSlice } from "@/features/todolists/model/tasks-slice.ts"

// создание store
export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [todolistsSlice.name]: todolistsSlice.reducer,
    [tasksSlice.name]: tasksSlice.reducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
