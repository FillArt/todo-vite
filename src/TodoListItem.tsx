import {Task} from "./App.tsx";

type TodoListProps = {
    title: string,
    tasks: Task[],
    data?: string
}

export const TodoListItem = ({title, tasks, data}: TodoListProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map((task: Task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{data}</div>
        </div>
    );
};