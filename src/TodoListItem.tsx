import {Task} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";

type TodoListProps = {
    title: string,
    tasks: Task[],
    data?: string
    deleteItem?: (id: number) => void
}

export const TodoListItem = ({title, tasks, data, deleteItem}: TodoListProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <ButtonBase title="+" onClick={() => {}}/>
            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} />
                                <span>{task.title}</span>
                                <ButtonBase title="X" onClick={() => deleteItem && deleteItem(task.id)} />
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <ButtonBase title="All"  onClick={() => {}}/>
                <ButtonBase title="Active"  onClick={() => {}}/>
                <ButtonBase title="Completed"  onClick={() => {}}/>
            </div>
            <div>{data}</div>
        </div>
    );
};