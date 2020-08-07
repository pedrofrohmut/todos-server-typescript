import User from "./User"

interface TaskParams {
  id?: string
  name?: string
  userId?: string
  user?: User
}

class Task {
  readonly id: string
  readonly name: string

  readonly userId: string
  readonly user?: User

  private constructor(task?: TaskParams) {
    this.id = task && task.id ? task.id : ""
    this.name = task && task.name ? task.name : ""
    this.userId = task && task.userId ? task.userId : ""
    this.user = task && task.user ? task.user : User.getInstance()
  }

  public static getInstance(task?: TaskParams): Task {
    return Object.freeze(new Task(task))
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

  public setUser(user: User): Task {
    return Task.getInstance({ ...this, user })
  }
}

export default Task
