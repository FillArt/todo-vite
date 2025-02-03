import {Filter, Task} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";
import {ChangeEvent, useState} from "react";
import './App.css'

type TodoListProps = {
    title: string,
    tasks: Task[],
    data?: string
    filter: Filter
    changeFilter: (filter: Filter) => void;
    deleteItem: (id: string) => void
    createTask: (task: string) => void;
    changeTaskStatus: (id: string, status: boolean) => void
}

export const TodoListItem = ({title, tasks, data, changeFilter, deleteItem, createTask, changeTaskStatus, filter}: TodoListProps) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onClickHandler = () => {
        const trimTitle = taskTitle.trim()
        if(trimTitle !== '') {
            createTask(trimTitle)
            setTaskTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }

    }

    const createTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    onChange={(e) => changeTaskTitleHandler(e)}
                    onKeyDown={(e) => createTaskOnEnterHandler(e)}
                    value={taskTitle}
                />
                <ButtonBase title="+" onClick={() => onClickHandler()}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteItem(task.id)
                        }

                        const changeTaskStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.currentTarget.checked)
                        }

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span>{task.title}</span>
                                <ButtonBase title="X" onClick={() => deleteTaskHandler()} />

                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                {filter}
                <ButtonBase className={filter === 'all' ? 'active-filter' : ''} title="All"  onClick={() => changeFilter('all')}/>
                <ButtonBase className={filter === 'active' ? 'active-filter' : ''} title="Active"  onClick={() => changeFilter('active')}/>
                <ButtonBase className={filter === 'completed' ? 'active-filter' : ''} title="Completed"  onClick={() => changeFilter('completed')}/>
            </div>
            <div>{data}</div>
        </div>
    );
};