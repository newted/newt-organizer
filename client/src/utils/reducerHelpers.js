export function dataArrayToObject(data) {
  const object = {}

  data.forEach(item => object[item._id] = item)

  return object
}

export function deleteItemFromObject(object, key) {
  delete object[key]
  return object
}
