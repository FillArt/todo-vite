import "./App.css"
// import {v1} from "uuid";

import { ThemeProvider } from "@mui/material/styles"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import CssBaseline from "@mui/material/CssBaseline"
import { getTheme } from "../common/theme/theme.ts"
// import { selectThemeMode } from "@/features/todolists/model/app-selectors.ts"
import { Header } from "@/common/components/Header/Header.tsx"
import { Main } from "@/app/Main.tsx"
import { themeSelector } from "@/app/app-slice.ts"
// import {themeMode} from "@/common/components/Header/Header.tsx";

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Filter = "all" | "active" | "completed"

export type TasksState = Record<string, Task[]>

export const App = () => {
  const themeMode = useAppSelector(themeSelector)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}
