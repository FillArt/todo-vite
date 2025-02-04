import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

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


export const App = () => {
    const [filter, setFilter] = useState<Filter>('all');

    const [todolists] = useState<Todolist[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])

    const [oneData, setOneData] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ]);

    let filteredOneData = oneData;

    if (filter === 'active') {
        filteredOneData = oneData.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredOneData = oneData.filter(task => task.isDone)
    }

    const deleteTask = (id: string) => {setOneData(oneData.filter((item) => item.id !== id))}
    const changeFilter = (filter: Filter) => {setFilter(filter)}
    const createTask = (task: string) => { setOneData([...oneData, {id: v1(), title: task, isDone: false}]) }
    const changeTaskStatus = (id: string, status: boolean) => {
        setOneData(oneData.map(task => task.id === id ? {...task, isDone: status } : task));
    }

    return (
        <div className="app">

            {todolists.map(todo => {
                return (
                    <TodoListItem
                        key={todo.id}
                        todo={todo}
                        tasks={filteredOneData}
                        data="01.02.2025"
                        deleteItem={deleteTask}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter} />
                )
            })}
        </div>
    )
}