import axios from 'axios'

export const CREATE_PROGRAM = 'CREATE_PROGRAM'

const createProgram = (payload) => {
  return {
    type: CREATE_PROGRAM,
    payload
  }
}

export const submitProgram = (values) => async dispatch => {
  const res = await axios.post('/api/programs', values)

  dispatch(createProgram(res.data))
}
