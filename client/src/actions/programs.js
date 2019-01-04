import axios from 'axios'

export const CREATE_PROGRAM = 'CREATE_PROGRAM'
export const FETCH_PROGRAMS = 'FETCH_PROGRAMS'

const createProgram = (payload) => {
  return {
    type: CREATE_PROGRAM,
    payload
  }
}

const getPrograms = (payload) => {
  return {
    type: FETCH_PROGRAMS,
    payload
  }
}

export const submitProgram = (values, history) => async dispatch => {
  const res = await axios.post('/api/programs', values)

  // Redirect to programs page
  history.push('/programs')

  dispatch(createProgram(res.data))
}

export const fetchPrograms = () => async dispatch => {
  const res = await axios.get('/api/programs')

  dispatch(getPrograms(res.data))
}
