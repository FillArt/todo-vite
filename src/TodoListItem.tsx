import {Filter, Task, Todolist} from "./App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";
import './App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

type TodoListProps = {
    todo: Todolist,
    tasks: Task[],
    changeFilter: (todoId: string, filter: Filter) => void;
    deleteItem: (idTodo: string, idTask: string) => void
    createTask: (idTodo: string, task: string) => void;
    deleteTodoList: (idTodo: string) => void
    changeTaskTitle: (todoId: string, id: string, title: string) => void
    changeTaskStatus: (idTodo: string, id: string, status: boolean) => void
    changeTodoListTitle: (idTodo: string, title: string) => void

    data?: string
}

export const TodoListItem = ({
                                 todo: {id, title, filter},
                                 tasks,
                                 data,
                                 changeFilter,
                                 deleteItem,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodoList,
                                 changeTaskTitle,
                                 changeTodoListTitle
                             }: TodoListProps) => {

    const changeFilterHandler = (filter: Filter) => {
        changeFilter(id, filter)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    const changeTodoListTitleHandler = (title: string) => {
        changeTodoListTitle(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <EditableSpan value={title} onChange={changeTodoListTitleHandler}  />
                <ButtonBase onClick={() => deleteTodoList(id)} color={'error'} style={'text'}>
                    <DeleteIcon/>
                </ButtonBase>
            </div>

            <CreateItemForm onCreateItem={createTaskHandler} />

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteItem(id, task.id)
                        }

                        const changeTaskStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                                <ButtonBase onClick={() => deleteTaskHandler()} color={'error'} style={'text'}>
                                    <DeleteIcon/>
                                </ButtonBase>

                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <ButtonBase className={filter === 'all' ? 'active-filter' : ''} style={'text'} title="All"
                            onClick={() => changeFilterHandler('all')}/>
                <ButtonBase className={filter === 'active' ? 'active-filter' : ''} style={'text'} title="Active"
                            onClick={() => changeFilterHandler('active')}/>
                <ButtonBase className={filter === 'completed' ? 'active-filter' : ''} style={'text'} title="Completed"
                            onClick={() => changeFilterHandler('completed')}/>
            </div>
            <div>{data}</div>
        </div>
    );
};