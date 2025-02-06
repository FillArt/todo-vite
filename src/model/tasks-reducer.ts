import type {TasksState} from '../App'

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.id]: []}
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

export type createTodoListAction = ReturnType<typeof createTodoListAC>

type Actions = createTodoListAction