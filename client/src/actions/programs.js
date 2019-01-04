export const CREATE_PROGRAM = 'CREATE_PROGRAM'

const createProgram = (payload) => {
  return {
    type: CREATE_PROGRAM,
    payload
  }
}
