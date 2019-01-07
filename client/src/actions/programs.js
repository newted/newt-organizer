import axios from 'axios'

export const CREATE_PROGRAM = 'CREATE_PROGRAM'
export const FETCH_PROGRAMS = 'FETCH_PROGRAMS'
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'

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

const putProgram = () => {
  return {
    type: UPDATE_PROGRAM
  }
}



export const submitProgram = (values, history) => async dispatch => {
  const res = await axios.post('/api/programs', values)

  // Redirect to programs page
  history.push('/programs')

  dispatch(createProgram(res.data))
}

export const fetchPrograms = () => async dispatch => {
  try {
    const res = await axios.get('/api/programs')

    dispatch(getPrograms(res.data))
  } catch (err) {
    console.log("Error while fetching programs.")
  }
}

export const updateProgram = (programId, values, history) => async dispatch => {
  try {
    await axios.put(`/api/programs/${programId}/edit`, values)

    history.push('/programs')

    dispatch(putProgram())
  } catch (err) {
    console.log("Error while updating program.")
  }
}
