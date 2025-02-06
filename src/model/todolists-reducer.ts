import {Todolist} from "../App.tsx";
type Actions = {
    type: string
    payload: any
}

const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todo => todo.id !== action.payload.id)
        default:
            return state
    }
}