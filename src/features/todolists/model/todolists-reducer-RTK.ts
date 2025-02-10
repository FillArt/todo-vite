import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {Filter, Todolist} from "../../../app/App.tsx";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id: string, filter: Filter}>('todolists/changeTodolistFilter')

export const todoReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })

        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })

        .addCase(changeTodolistTitleAC, (state, action) => {
            const todo = state.find(item => item.id === action.payload.id)
            if(todo) {
                todo.title = action.payload.title
            }
        })

        .addCase(changeTodolistFilterAC, (state, action) => {
            const todo = state.find(item => item.id === action.payload.id)
            if(todo) {
                todo.filter = action.payload.filter
            }
        })

        .addDefaultCase((_state, action) => {
            console.warn('Unhandled action:', action);
        })
})