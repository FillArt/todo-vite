import {Filter, Task, Todolist} from "./app/App.tsx";
import {ButtonBase} from "./assets/components/ButtonBase.tsx";
import './app/App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

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
}

export const TodoListItem = ({
                                 todo: {id, title, filter},
                                 tasks,
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
                <EditableSpan value={title} onChange={changeTodoListTitleHandler}/>
                <ButtonBase onClick={() => deleteTodoList(id)} color={'error'} style={'text'}>
                    <DeleteIcon/>
                </ButtonBase>
            </div>

            <CreateItemForm onCreateItem={createTaskHandler}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteItem(id, task.id)
                        }

                        const changeTaskStatusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(event.currentTarget.checked)
                            changeTaskStatus(id, task.id, event.currentTarget.checked)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <ListItem key={task.id}
                                      sx={getListItemSx(task.isDone)}
                                      className={task.isDone ? 'is-done' : ''}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>

                                <ButtonBase onClick={() => deleteTaskHandler()} color={'error'} style={'text'}>
                                    <DeleteIcon/>
                                </ButtonBase>

                            </ListItem>
                        )
                    })}
                </List>
            )}

            <Box sx={containerSx}>
                <ButtonBase className={filter === 'all' ? 'active-filter' : ''} style={'text'} title="All"
                            onClick={() => changeFilterHandler('all')}/>
                <ButtonBase className={filter === 'active' ? 'active-filter' : ''} style={'text'} title="Active"
                            onClick={() => changeFilterHandler('active')}/>
                <ButtonBase className={filter === 'completed' ? 'active-filter' : ''} style={'text'} title="Completed"
                            onClick={() => changeFilterHandler('completed')}/>
            </Box>
        </div>
    );
};