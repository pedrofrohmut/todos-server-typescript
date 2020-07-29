export const validateName = (name:string):boolean =>
  name !== undefined && name !== "" && name.length > 3 && name.length <= 50

export const validateDescription = (description:string):boolean =>
  description !== undefined && description !== "" && description.length > 3 && description.length <= 250
