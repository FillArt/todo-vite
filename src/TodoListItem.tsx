import {Todolist} from "./app/App.tsx";
import './app/App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {createTaskAC} from "@/model/tasks-reducer-RTK.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {Tasks} from "@/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";

type TodoListProps = {
    todo: Todolist;
}

export const TodoListItem = ({
                                 todo: {id, title, filter},
                             }: TodoListProps) => {

    const dispatch = useAppDispatch();

    const createTask = (title: string) => {
        dispatch(createTaskAC({ idTodo: id, title }));
    }

    return (
        <div>
            <TodolistTitle id={id} title={title} />
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks id={id} filter={filter} />
            <FilterButtons id={id} filter={filter} />
        </div>
    );
};