import Task from "./Task"

interface TodoParams {
  id?: string
  name?: string
  description?: string
  isComplete?: boolean
  taskId?: string
  task?: Task
}

class Todo {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly isComplete: boolean

  readonly taskId: string
  readonly task?: Task

  private constructor(todo?: TodoParams) {
    this.id = todo && todo.id ? todo.id : ""
    this.name = todo && todo.name ? todo.name : ""
    this.description = todo && todo.description ? todo.description : ""
    this.isComplete = todo && todo.isComplete ? todo.isComplete : false
    this.taskId = todo && todo.taskId ? todo.taskId : ""
    this.task = todo && todo.task ? todo.task : Task.getInstance()
  }

  public static getInstance(todo?: TodoParams): Todo {
    return Object.freeze(new Todo(todo))
  }

  public getId():string{
    return this.id
  }

  public getName():string{
    return this.name
  }

  public getDescription():string{
    return this.description
  }

  public getIsComplete():boolean{
    return this.isComplete
  }

  public getTaskId():string{
    return this.id
  }

  public getTask():Task {
    return this.task || Task.getInstance()
  }

  public setId(id:string):Todo {
    return Todo.getInstance({ ...this, id })
  }

  public setName(name:string):Todo {
    return Todo.getInstance({ ...this, name })
  }

  public setDescription(description:string):Todo {
    return Todo.getInstance({ ...this, description })
  }

  public setIsComplete(isComplete:boolean):Todo {
    return Todo.getInstance({ ...this, isComplete })
  }

  public setTaskId(taskId:string):Todo {
    return Todo.getInstance({ ...this, taskId })
  }

  public setTask(task:Task):Todo {
    return Todo.getInstance({ ...this, task })
  }
}

export default Todo
