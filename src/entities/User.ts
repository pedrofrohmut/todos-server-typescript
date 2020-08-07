interface UserParams {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

class User {
  readonly id: string
  readonly firstName: string
  readonly lastName: string
  readonly email: string
  readonly password: string

  private constructor(user?: UserParams) {
    this.id = user && user.id ? user.id : ""
    this.firstName = user && user.firstName ? user.firstName : ""
    this.lastName = user && user.lastName ? user.lastName : ""
    this.email = user && user.email ? user.email : ""
    this.password = user && user.password ? user.password : ""
  }

  public static getInstance(user?: UserParams): User {
    return Object.freeze(new User(user))
  }

  public getId(): string {
    return this.id
  }

  public getFirstName(): string {
    return this.firstName
  }

  public getLastName(): string {
    return this.lastName
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public setId(id: string): User {
    return User.getInstance({ ...this, id })
  }

  public setFirstName(firstName: string): User {
    return User.getInstance({ ...this, firstName })
  }

  public setLastName(lastName: string): User {
    return User.getInstance({ ...this, lastName })
  }

  public setEmail(email: string): User {
    return User.getInstance({ ...this, email })
  }

  public setPassword(password: string): User {
    return User.getInstance({ ...this, password })
  }
}

export default User
