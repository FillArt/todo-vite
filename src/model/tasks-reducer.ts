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

        case 'delete_task': {
            console.log('1')
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)}
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

export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => {
    return {
        type: 'delete_task',
        payload: {
            todoId: payload.todolistId,
            taskId: payload.taskId
        }
    } as const
}

export type createTodoListAction = ReturnType<typeof createTodoListAC>
export type deleteTodoListAction = ReturnType<typeof deleteTodoListAC>
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>

type Actions = createTodoListAction | deleteTodoListAction | deleteTaskAction