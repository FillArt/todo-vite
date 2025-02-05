import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'

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

    const todoListIdOne = v1()
    const todoListIdTwo = v1()

    const [todolists, setTodoLists] = useState<Todolist[]>([
        {id: todoListIdOne, title: 'What to learn', filter: 'all'},
        {id: todoListIdTwo, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todoListIdOne]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListIdTwo]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const deleteTask = (idTodo: string, idTask: string) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].filter(task => task.id !== idTask)})
    }

    const createTask = (idTodo: string, task: string) => {
        setTasks({...tasks, [idTodo]: [...tasks[idTodo], {id: v1(), title: task, isDone: false}]})
    }

    const changeTaskStatus = (idTodo: string, id: string, status: boolean) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].map(item => item.id === id ? {...item, isDone: status} : item)})
    }

    const changeFilter = (todoID: string, filter: Filter) => {
        setTodoLists(todolists.map(item => item.id === todoID ? {...item, filter} : item))
    }

    const deleteTodoList = (todoId: string) => {
        setTodoLists(todolists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }

    const createTodoList = (title: string) => {
        const id = v1()
        setTodoLists([...todolists, {id: id, title, filter: 'all'}])
        setTasks({...tasks, [id]: []})
    }

    const changeTaskTitle = (todoId: string, id: string, title: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(task => task.id === id ? {...task, title} : task)})
    }

    const changeTodoListTitle = (todoId: string, title: string) => {
        setTodoLists(todolists.map(todo => todo.id === todoId ? {...todo, title} : todo))
    }

    return (
        <div className="app">

            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth={'lg'}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Button color="inherit">Sign in</Button>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container maxWidth={'lg'}>
                <Grid container>
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
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}