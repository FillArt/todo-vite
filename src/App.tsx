import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

import Paper from '@mui/material/Paper'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";

import {createTheme, ThemeProvider} from '@mui/material/styles'
import {
    changeTodolistFilterAC, changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    createTaskAC,
    createTodoListAC,
    deleteTaskAC,
    deleteTodoListAC,
    tasksReducer
} from "./model/tasks-reducer.ts";


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

    const [todolists,  dispatchToTodolists] = useReducer(todolistReducer, [])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {})


    const deleteTask = (idTodo: string, idTask: string) => {
        dispatchTasks(deleteTaskAC({todolistId: idTodo, taskId: idTask}))
    }

    const createTask = (idTodo: string, task: string) => {
        dispatchTasks(createTaskAC({todolistId: idTodo, title: task}))
    }

    const changeTaskStatus = (idTodo: string, id: string, status: boolean) => {
        dispatchTasks(changeTaskStatusAC({todolistId: idTodo, taskId: id, isDone: status}))
    }

    const changeTaskTitle = (todoId: string, id: string, title: string) => {
        // setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id === id ? {...task, title} : task)})
    }

    const changeFilter = (todoID: string, filter: Filter) => {
        dispatchToTodolists(changeTodolistFilterAC({id: todoID, filter}))
    }

    const deleteTodoList = (todoId: string) => {
        dispatchToTodolists(deleteTodolistAC(todoId))
        dispatchTasks(deleteTodoListAC(todoId))
    }

    const createTodoList = (title: string) => {
        const id = v1()
        dispatchToTodolists(createTodolistAC(id, title))
        dispatchTasks(createTodoListAC(id))
    }

    const changeTodoListTitle = (todoId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({ id: todoId, title }));
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ef6c00',
            },
        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
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