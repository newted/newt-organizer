import axios from 'axios'

export const CREATE_PROGRAM = 'CREATE_PROGRAM'

const createProgram = (payload) => {
  return {
    type: CREATE_PROGRAM,
    payload
  }
}

export const submitProgram = (values, history) => async dispatch => {
  const res = await axios.post('/api/programs', values)

  // Redirect to programs page
  history.push('/programs')

  dispatch(createProgram(res.data))
}
