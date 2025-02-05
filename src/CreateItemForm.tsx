import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import {ButtonBase} from "./assets/components/ButtonBase.tsx";
import TextField from "@mui/material/TextField";


type Props = {
    onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            onCreateItem(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <TextField
                label="Outlined"
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemTitleHandler}
                onKeyDown={createItemOnEnterHandler} variant="outlined"/>


            <ButtonBase title={'+'} onClick={createItemHandler}/>
        </div>
    )
}