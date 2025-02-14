import {TodoListItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodoListItem.tsx";
import Paper from "@mui/material/Paper";
// import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
// import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {TodoListApi} from "@/features/todolists/api/todolistsApi.types.ts";

type TodolistProps = {
    todolists: TodoListApi[]
}

export const Todolists = ({todolists}: TodolistProps) => {
    // const todolist = useAppSelector(selectTodolists);

    return (
        <>
            {todolists.map((todo) => {
                return (
                    <Paper key={todo.id} sx={{ p: "0 20px 20px 20px" }}>
                        <TodoListItem todo={todo} />
                    </Paper>
                );
            })}
        </>
    );
};
