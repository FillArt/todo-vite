export type TodoListApi = {
    addedDate: string;
    id: string
    order: number
    title: string
}


export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
}