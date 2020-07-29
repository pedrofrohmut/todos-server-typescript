export const validateName = (name:string):boolean =>
  name !== undefined && name !== "" && name.length > 3 && name.length <= 50
