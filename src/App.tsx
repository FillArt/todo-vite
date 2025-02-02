import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";
import {useState} from "react";

export type Task = {
    id: number,
    title: string,
    isDone: boolean,
}

export type Filter = 'all' | 'active' | 'completed';

export const App = () => {
    const [filter, setFilter] = useState<Filter>('all');

    const [oneData, setOneData] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]);

    let filteredOneData = oneData;

    if (filter === 'active') {
        filteredOneData = oneData.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredOneData = oneData.filter(task => task.isDone)
    }

    const [twoData] = useState<Task[]>([]);


    const deleteTask = (id: number) => {setOneData(oneData.filter((item) => item.id !== id))}
    const changeFilter = (filter: Filter) => {
        setFilter(filter)
    }

    return (
        <div className="app">
            <TodoListItem title={"First To-Do"} tasks={filteredOneData} data="01.02.2025" deleteItem={deleteTask} changeFilter={changeFilter}/>
            <TodoListItem title={"Second To-Do"} tasks={twoData}  changeFilter={changeFilter}/>
        </div>
    )
}