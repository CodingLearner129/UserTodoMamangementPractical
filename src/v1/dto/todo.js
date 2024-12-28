import moment from "moment";

export class TodoDTO {
    constructor(todo) {
        this._id = todo._id ?? "";
        this.title = todo.title ?? "";
        this.body = todo.body ?? 0;
        this.created_at = todo.created_at ?? 0;
        this.updated_at = todo.updated_at ?? 0;
    }
}

export class TodoListDTO {
    constructor(todos) {
        return todos.map(todo => {
            return {
                _id: todo._id ?? "",
                title: todo.title ?? "",
                body: todo.body ?? 0,
                created_at: todo.created_at ?? 0,
                updated_at: todo.updated_at ?? 0,
            }
        })
    }
}