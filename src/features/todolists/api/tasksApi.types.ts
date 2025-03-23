export type BaseTask = {
  id: string
  title: string
  description: null
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: null
  deadline: null
  addedDate: string
}

export type DomainTask = {
  error: string | null
  items: BaseTask[]
  totalCount: number
}

export type CreateTask = {
  data: {
    item: BaseTask
  }
}
