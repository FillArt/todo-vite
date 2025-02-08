import {createAction, createReducer} from "@reduxjs/toolkit";
import {TasksState} from "../app/App.tsx";

const initialState: TasksState = {}

export const deleteTodoListAC = createAction<{id: string}>('todolists/deleteTodolist')


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addDefaultCase((_state, action) => {
            console.warn('Unhandled action:', action);
        })
})