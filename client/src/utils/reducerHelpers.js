export function coursesByProgram(programs) {
  const coursesObj = {}

  programs.forEach(({ _id, courses }) => coursesObj[_id] = courses)

  return coursesObj
}
