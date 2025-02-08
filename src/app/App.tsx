import './App.css'
import {TodoListItem} from "../TodoListItem.tsx";
// import {v1} from "uuid";
import {CreateItemForm} from "../CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

import Paper from '@mui/material/Paper'
import {containerSx} from "../TodolistItem.styles.ts";
import {NavButton} from "../NavButton.ts";

import {createTheme, ThemeProvider} from '@mui/material/styles'

import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";

import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";

import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer-RTK.ts";

import {changeStatusTaskAC, changeTitleTaskAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer-RTK.ts";
import {selectThemeMode} from "../model/app-selectors.ts";
import {changeThemeModeAC} from "./app-reducer.ts";


export type Task = {
    id: string,
    title: string,
    isDone: boolean,
}

export type Filter = 'all' | 'active' | 'completed';

export type Todolist = {
    id: string
    title: string
    filter: Filter
}

export type TasksState = Record<string, Task[]>


export const App = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)

    // const [themeMode, setThemeMode] = useState<ThemeMode>('light')


    const createTodoList = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const deleteTodoList = (todoId: string) => {
        dispatch(deleteTodolistAC({id: todoId}))
    }

    const changeTodoListTitle = (todoId: string, title: string) => {
        dispatch(changeTodolistTitleAC({ id: todoId, title }));
    }

    const createTask = (idTodo: string, task: string) => {
        dispatch(createTaskAC({idTodo: idTodo, title: task}))
    }

    const deleteTask = (idTodo: string, idTask: string) => {
        dispatch(deleteTaskAC({idTodo: idTodo, idTask: idTask}))
    }

    const changeTaskStatus = (idTodo: string, id: string, status: boolean) => {
        dispatch(changeStatusTaskAC({idTodo: idTodo, idTask: id, isDone: status}))
    }

    const changeTaskTitle = (todoId: string, id: string, title: string) => {
        dispatch(changeTitleTaskAC({idTodo: todoId, idTask: id, title}))
    }

    const changeFilter = (todoID: string, filter: Filter) => {
        dispatch(changeTodolistFilterAC({id: todoID, filter}))
    }

    // ------------

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        },
    })

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode} />
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodoList}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map(todo => {
                            let filteredTasks = tasks[todo.id]

                            if (todo.filter === 'active') {
                                filteredTasks = tasks[todo.id].filter(task => !task.isDone)
                            }
                            if (todo.filter === 'completed') {
                                filteredTasks = tasks[todo.id].filter(task => task.isDone)
                            }
                            return (
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <TodoListItem
                                        key={todo.id}
                                        todo={todo}
                                        tasks={filteredTasks}
                                        deleteItem={deleteTask}
                                        createTask={createTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTodoList={deleteTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}