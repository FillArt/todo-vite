import { beforeEach, expect, test } from "vitest"
import type { Todolist } from "../../../../app/App.tsx"
import { changeTodolistFilterAC, deleteTodolistAC, todoReducer } from "../todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"
import { createTodolistAC } from "../todolists-slice.ts"
import { changeTodolistTitleAC } from "../todolists-slice.ts"

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todoReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  const endState = todoReducer(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test("correct todolist should change its title", () => {
  const title = "New title"
  const endState = todoReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct todolist should change its filter", () => {
  const filter = "completed"
  const endState = todoReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
