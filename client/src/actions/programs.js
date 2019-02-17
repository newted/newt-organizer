import axios from 'axios'
import firebase from '../config/firebase'
import _ from 'lodash'

export const REQUEST_PROGRAMS = 'REQUEST_PROGRAMS'
export const RESOLVE_PROGRAMS = 'RESOLVE_PROGRAMS'
export const CREATE_PROGRAM = 'CREATE_PROGRAM'
export const FETCH_PROGRAMS = 'FETCH_PROGRAMS'
export const UPDATE_PROGRAM = 'UPDATE_PROGRAM'
export const DELETE_PROGRAM = 'DELETE_PROGRAM'

const requestPrograms = () => {
  return {
    type: REQUEST_PROGRAMS
  }
}

const resolvePrograms = () => {
  return {
    type: RESOLVE_PROGRAMS
  }
}

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

const putProgram = (payload) => {
  return {
    type: UPDATE_PROGRAM,
    payload
  }
}

const removeProgram = (payload) => {
  return {
    type: DELETE_PROGRAM,
    payload
  }
}



export const submitProgram = (values, history) => async dispatch => {
  try {
    dispatch(requestPrograms())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    // Request returns the created program
    const res = await axios.post(
      '/api/programs',
      values,
      { headers: { Authorization: idToken }}
    )

    dispatch(createProgram(res.data))

    // Redirect to programs page
    history.push('/programs')
  } catch (error) {
    dispatch(resolvePrograms())
    console.log("Error while creating program", error)
  }
}

export const fetchPrograms = () => async dispatch => {
  try {
    dispatch(requestPrograms())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    // Send token to server through Authorization header
    const res = await axios.get('/api/programs', {
      headers: { Authorization: idToken }
    })

    // Sort program by date it was created
    const programs = _.sortBy(
      res.data,
      ({ dateCreated }) => new Date(dateCreated)
    )

    dispatch(getPrograms(programs))
  } catch (error) {
    dispatch(resolvePrograms())
    console.log("Error while fetching programs.", error)
  }
}

export const updateProgram = (programId, values, history) => async dispatch => {
  try {
    dispatch(requestPrograms())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    // Request returns updated program
    const res = await axios.put(
      `/api/programs/${programId}/edit`,
      values,
      { headers: { Authorization: idToken }}
    )

    dispatch(putProgram(res.data))

    history.push('/programs')
  } catch (error) {
    dispatch(resolvePrograms())
    console.log("Error while updating program.", error)
  }
}

export const deleteProgram = (programId, history) => async dispatch => {
  try {
    dispatch(requestPrograms())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    // Dispatching before request because it won't respond with data.
    dispatch(removeProgram(programId))

    await axios.delete(`/api/programs/${programId}`, {
      headers: { Authorization: idToken }
    })

    history.push('/programs')
  } catch (error) {
    dispatch(resolvePrograms())
    console.log("Error while deleting program.", error)
  }
}
