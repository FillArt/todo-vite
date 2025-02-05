import {Filter, Task, Todolist} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";
import {ChangeEvent, useState} from "react";
import './App.css'

type TodoListProps = {
    todo: Todolist,
    tasks: Task[],
    changeFilter: (todoId: string, filter: Filter) => void;

    deleteItem: (idTodo: string, idTask: string) => void

    createTask: (task: string) => void;
    changeTaskStatus: (id: string, status: boolean) => void
    data?: string
}

export const TodoListItem = ({todo: {id, title, filter}, tasks, data, changeFilter, deleteItem, createTask, changeTaskStatus}: TodoListProps) => {

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

    const changeFilterHandler = (filter: Filter) => { changeFilter(id, filter) }

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
                            deleteItem(id, task.id)
                        }

                        const changeTaskStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(task.id, event.currentTarget.checked)
                        }

                        return (
                            <li key={task.id}  className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span>{task.title}</span>
                                <ButtonBase title="X" onClick={() => deleteTaskHandler()} />

                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <ButtonBase className={filter === 'all' ? 'active-filter' : ''} title="All"  onClick={() => changeFilterHandler('all')}/>
                <ButtonBase className={filter === 'active' ? 'active-filter' : ''} title="Active"  onClick={() => changeFilterHandler('active')}/>
                <ButtonBase className={filter === 'completed' ? 'active-filter' : ''} title="Completed"  onClick={() => changeFilterHandler('completed')}/>
            </div>
            <div>{data}</div>
        </div>
    );
};