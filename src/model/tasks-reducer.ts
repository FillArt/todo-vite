import type {TasksState} from '../App'

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
        }
        case 'delete_todolist': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default:
            return state
    }
}

export const createTodoListAC = (todoId: string) => {
    return {
        type: 'create_todolist',
        payload: {
            id: todoId
        }
    } as const
}

export const deleteTodoListAC = (todoId: string) => {
    return {
        type: 'delete_todolist',
        payload: {
            id: todoId
        }
    } as const
}

export type createTodoListAction = ReturnType<typeof createTodoListAC>
export type deleteTodoListAction = ReturnType<typeof deleteTodoListAC>

type Actions = createTodoListAction | deleteTodoListAction