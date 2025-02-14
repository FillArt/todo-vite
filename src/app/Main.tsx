import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer-RTK.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";
import {useEffect, useState} from "react";
import {TodoListApi} from "@/features/todolists/api/todolistsApi.types.ts";
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";

export const Main = () => {

    const dispatch = useAppDispatch()
    const createTodoList = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    const [todolists, setTodolists] = useState<TodoListApi[]>([])

    useEffect(() => {
        todolistsApi.getTodolists().then(res => setTodolists(res.data))
    }, [])

    console.log(todolists)

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodoList}/>
            </Grid>

            <Grid container spacing={4}>
                <Todolists todolists={todolists}/>
            </Grid>
        </Container>
    )
}