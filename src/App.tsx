import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";

export type Task = {
    id: number,
    title: string,
    isDone: boolean,
}

export const App = () => {

    const oneData: Task[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]

    const twoData: Task[] = []

    return (
        <div className="app">
            <TodoListItem title={"First To-Do"} tasks={oneData} data="01.02.2025"/>
            <TodoListItem title={"Second To-Do"} tasks={twoData}/>
        </div>
    )
}