import {Filter, Task} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";

type TodoListProps = {
    title: string,
    tasks: Task[],
    data?: string
    changeFilter: (filter: Filter) => void;
    deleteItem?: (id: number) => void
}

export const TodoListItem = ({title, tasks, data, changeFilter, deleteItem}: TodoListProps) => {
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
                <ButtonBase title="All"  onClick={() => changeFilter('all')}/>
                <ButtonBase title="Active"  onClick={() => changeFilter('active')}/>
                <ButtonBase title="Completed"  onClick={() => changeFilter('completed')}/>
            </div>
            <div>{data}</div>
        </div>
    );
};