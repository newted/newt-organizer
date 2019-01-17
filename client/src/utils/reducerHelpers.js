export function coursesByProgram(programs) {
  const coursesObj = {}

  programs.forEach(program => {
    const programId = program._id
    const courses = program.courses

    coursesObj[programId] = courses
  })

  return coursesObj
}
