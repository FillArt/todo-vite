import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TasksState} from "../app/App.tsx";

const initialState: TasksState = {}

export const deleteTodoListAC = createAction<{id: string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction<{id: string}>('todolists/createTodolist')
export const deleteTaskAC = createAction<{idTodo: string, idTask: string}>('todolists/deleteTask')
export const createTaskAC = createAction<{idTodo: string, title: string}>('todolists/createTaskAC')
export const changeStatusTaskAC = createAction<{idTodo: string, idTask: string, isDone: boolean}>('todolists/changeStatusTask')
export const changeTitleTaskAC = createAction<{idTodo: string, idTask: string, title: string}>('todolists/changeTitleTask')

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })

        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })

        .addCase(deleteTaskAC, (state, action) => {
            const { idTodo, idTask } = action.payload;
            if (state[idTodo]) {
                state[idTodo] = state[idTodo].filter(item => item.id !== idTask)
            }
        })

        .addCase(createTaskAC, (state, action) => {
            const { idTodo, title } = action.payload;
            if(state[idTodo]) {
                const newTask = {
                    id: nanoid(),
                    title,
                    isDone: false
                }
                state[idTodo].unshift(newTask)
            }
        })

        .addCase(changeStatusTaskAC, (state, action) => {
            const {idTodo, idTask, isDone} = action.payload
            if(state[idTodo]) {
                state[idTodo].filter(task => task.id === idTask ? {...task, isDone} : task)
            }
        })

        .addCase(changeTitleTaskAC, (state, action) => {
            const {idTodo, idTask, title} = action.payload

            const task = state[idTodo].find(task => task.id === idTask);
            if (task) {
                task.title = title;
            }
        })

        .addDefaultCase((_state, action) => {
            console.warn('Unhandled action:', action);
        })
})