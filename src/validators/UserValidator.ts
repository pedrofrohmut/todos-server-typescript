import Validator from "validator"

export const validateEmail = (email: string | undefined): boolean =>
  email !== undefined && email !== "" && Validator.isEmail(email)

export const validateFirstName = (firstName: string | undefined): boolean =>
  firstName !== undefined && firstName !== "" && firstName.length > 2 && firstName.length <= 18

export const validateLastName = (lastName: string | undefined): boolean =>
  lastName !== undefined && lastName !== "" && lastName.length > 2 && lastName.length <= 80

export const validatePassword = (password: string | undefined): boolean =>
  password !== undefined && password !== "" && password.length > 2 && password.length <= 24
