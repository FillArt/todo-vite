import {EditableSpan} from "@/EditableSpan.tsx";
import {ButtonBase} from "@/assets/components/ButtonBase.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer-RTK.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    id: string,
    title: string,
}

export const TodolistTitle = ({id, title}: Props) => {

    const dispatch = useAppDispatch();

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({ id, title }));
    }

    const deleteTodoList = (todoId: string) => {
        dispatch(deleteTodolistAC({ id: todoId }));
    };


    return (
        <div className={'container'}>
            <EditableSpan value={title} onChange={changeTodoListTitle}/>
            <ButtonBase onClick={() => deleteTodoList(id)} color={'error'} style={'text'}>
                <DeleteIcon/>
            </ButtonBase>
        </div>
    )
}