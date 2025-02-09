import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {createTodolistAC} from "@/features/todolists/model/todolists-reducer-RTK.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {

    const dispatch = useAppDispatch()
    const createTodoList = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodoList}/>
            </Grid>

            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}