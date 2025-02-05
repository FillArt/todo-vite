import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";

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
        { id: todoListIdOne, title: 'What to learn', filter: 'all' },
        { id: todoListIdTwo, title: 'What to buy', filter: 'all' },
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todoListIdOne]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todoListIdTwo]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
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
        setTasks({ ...tasks })
    }

    const createTodoList = (title: string) => {
        const id = v1()
        setTodoLists([...todolists, {id: id, title, filter: 'all' }])
        setTasks({...tasks, [id]: []})
    }

    return (
        <div className="app">

            <CreateItemForm onCreateItem={createTodoList} />

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
                        data="01.02.2025"
                        deleteItem={deleteTask}
                        createTask={createTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodoList={deleteTodoList}
                    />
                )
            })}
        </div>
    )
}