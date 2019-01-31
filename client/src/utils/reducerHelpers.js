export function programsArrayToObject(programs) {
  const object = {}

  programs.forEach(program => object[program._id] = program)

  return object
}

export function deleteItemFromObject(object, key) {
  delete object[key]
  return object
}
