import './App.css'
import {TodoListItem} from "./TodoListItem.tsx";

export const  App = () => {
    return (
        <div className="app">
            <TodoListItem title={"First To-Do"} />
            <TodoListItem title={"Second To-Do"} />
            <TodoListItem title={"Why not To-Do"} />
        </div>
    )
}