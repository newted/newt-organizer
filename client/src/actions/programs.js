import axios from 'axios'
import _ from 'lodash'

export const CREATE_PROGRAM = 'CREATE_PROGRAM'
export const FETCH_PROGRAMS = 'FETCH_PROGRAMS'
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'
export const DELETE_PROGRAM = 'DELETE_PROGRAM'

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

const removeProgram = () => {
  return {
    type: DELETE_PROGRAM
  }
}



export const submitProgram = (values, history) => async dispatch => {
  // Request returns the created program
  const res = await axios.post('/api/programs', values)

  dispatch(createProgram(res.data))

  // Redirect to programs page
  history.push('/programs')
}

export const fetchPrograms = () => async dispatch => {
  try {
    const res = await axios.get('/api/programs')
    // Sort program by date it was created
    const programs = _.sortBy(
      res.data,
      ({ dateCreated }) => new Date(dateCreated)
    )

    dispatch(getPrograms(programs))
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

export const deleteProgram = (programId, history) => async dispatch => {
  try {
    await axios.delete(`/api/programs/${programId}`)

    history.push('/programs')

    dispatch(removeProgram())
  } catch (err) {
    console.log("Error while deleting program.")
  }
}
