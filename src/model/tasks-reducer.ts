import type {TasksState} from '../App'
import {v1} from "uuid";

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
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
            }
        }

        case 'create_task': {
            return {
                ...state,
                [action.payload.todoId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoId]]
            }
        }

        case 'change_status' : {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
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

export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return {
        type: 'delete_task',
        payload: {
            todoId: payload.todolistId,
            taskId: payload.taskId
        }
    } as const
}

export const createTaskAC = (payload: { todolistId: string, title: string }) => {
    return {
        type: 'create_task',
        payload: {
            todoId: payload.todolistId,
            title: payload.title
        }
    } as const
}

export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return {
        type: 'change_status',
        payload: {
            todoId: payload.todolistId,
            taskId: payload.taskId,
            isDone: payload.isDone
        }
    } as const
}

export type createTodoListAction = ReturnType<typeof createTodoListAC>
export type deleteTodoListAction = ReturnType<typeof deleteTodoListAC>
export type deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type createTaskAction = ReturnType<typeof createTaskAC>
export type changeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>

type Actions =
    createTodoListAction
    | deleteTodoListAction
    | deleteTaskAction
    | createTaskAction
    | changeTaskStatusAction