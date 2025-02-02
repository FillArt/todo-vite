import {Task} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";

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
                <ButtonBase title="+"/>
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
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <ButtonBase title="All"/>
                <ButtonBase title="Active"/>
                <ButtonBase title="Completed"/>
            </div>
            <div>{data}</div>
        </div>
    );
};