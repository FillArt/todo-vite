import {containerSx} from "@/TodolistItem.styles.ts";
import {ButtonBase} from "@/assets/components/ButtonBase.tsx";
import Box from "@mui/material/Box";
import {Filter} from "@/app/App.tsx";
import {changeTodolistFilterAC} from "@/model/todolists-reducer-RTK.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    id: string,
    filter: Filter,
}

export const FilterButtons = ({id, filter}: Props) => {
    const dispatch = useAppDispatch();

    const changeFilter = (filter: Filter) => {
        dispatch(changeTodolistFilterAC({ id, filter }));
    }

    return (
        <Box sx={containerSx}>
            <ButtonBase className={filter === 'all' ? 'active-filter' : ''} style={'text'} title="All"
                        onClick={() => changeFilter('all')}/>
            <ButtonBase className={filter === 'active' ? 'active-filter' : ''} style={'text'} title="Active"
                        onClick={() => changeFilter('active')}/>
            <ButtonBase className={filter === 'completed' ? 'active-filter' : ''} style={'text'} title="Completed"
                        onClick={() => changeFilter('completed')}/>
        </Box>
    );
};