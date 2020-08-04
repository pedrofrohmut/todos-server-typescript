import User from "./User"

class Task {
  private id: string
  private name: string

  private userId: string
  private user?: User

  private constructor(task?: Task) {
    this.id = task && task.id ? task.id : ""
    this.name = task && task.name ? task.name : ""
    this.userId = task && task.userId ? task.userId : ""
  }

  public static getInstance(task?: Task): Task {
    return Object.freeze(this.constructor(task))
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getUserId(): string {
    return this.userId
  }

  public getUser(): User {
    return this.user || User.getInstance()
  }

  public setId(id: string): Task {
    return Task.getInstance({ ...this, id })
  }

  public setName(name: string): Task {
    return Task.getInstance({ ...this, name })
  }

  public setUserId(userId: string): Task {
    return Task.getInstance({ ...this, userId })
  }

  public setUser(user:User):Task {
    return Task.getInstance({ ...this, user })
  }
}

export default Task
