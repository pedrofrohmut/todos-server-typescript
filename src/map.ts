import IUserModel from "./models/types/IUserModel"

declare module "express" {
  interface Request {
    user?: IUserModel
  }
}
