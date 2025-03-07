import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { createTodolistAC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"

export const Main = () => {
  const dispath = useAppDispatch()
  const createTodolistHandler = (title: string) => dispath(createTodolistAC(title))

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreate={createTodolistHandler} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
