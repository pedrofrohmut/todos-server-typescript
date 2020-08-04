import Task from "./Task"

class Todo {
  private id: string
  private name: string
  private description: string
  private isComplete: boolean

  private taskId: string
  private task?: Task

  private constructor(todo?: Todo) {
    this.id = todo && todo.id ? todo.id : ""
    this.name = todo && todo.name ? todo.name : ""
    this.description = todo && todo.description ? todo.description : ""
    this.isComplete = todo && todo.isComplete ? todo.isComplete : false
    this.taskId = todo && todo.taskId ? todo.taskId : ""
    this.task = todo && todo.task ? todo.task : Task.getInstance()
  }

  public static getInstance(todo?: Todo): Todo {
    return Object.freeze(this.constructor(todo))
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
