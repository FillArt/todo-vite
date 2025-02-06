import {Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

export const todolistReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todo => todo.id !== action.payload.id)
        case 'create_todolist': {
            const newTodo: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodo]
        }
        case "change_todolist_title":
            return state.map(todo => todo.id === action.payload.id ? {...todo, title: action.payload.title} : todo)

        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: { id }} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: { id: v1(), title }} as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {type: 'change_todolist_title', payload: { id: payload.id, title: payload.title }} as const
}


export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | changeTodolistTitleAction