import axios from 'axios'
import firebase from '../config/firebase'

export const REQUEST_COURSES = 'REQUEST_COURSES'
export const RESOLVE_COURSES = 'RESOLVE_COURSES'
export const CREATE_COURSE = 'CREATE_COURSE'
export const FETCH_COURSES = 'FETCH_COURSES'
export const FETCH_ALL_COURSES = 'FETCH_ALL_COURSES'
export const UPDATE_COURSE = 'UPDATE_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'

export const requestCourses = () => {
  return {
    type: REQUEST_COURSES
  }
}

export const resolveCourses = () => {
  return {
    type: RESOLVE_COURSES
  }
}

const createCourse = (payload) => {
  return {
    type: CREATE_COURSE,
    payload
  }
}

const getCourses = (payload) => {
  return {
    type: FETCH_COURSES,
    payload
  }
}

const getAllCourses = payload => {
  return {
    type: FETCH_ALL_COURSES,
    payload
  }
}

const putCourse = (payload) => {
  return {
    type: UPDATE_COURSE,
    payload
  }
}

const removeCourse = (payload) => {
  return {
    type: DELETE_COURSE,
    payload
  }
}


export const submitCourse = (programId, values, history) => async dispatch => {
  try {
    dispatch(requestCourses())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    const res = await axios.post(
      `/api/programs/${programId}/course`,
      values,
      { headers: { Authorization: idToken }}
    )

    const payload = {
      course: res.data,
      programId
    }

    dispatch(createCourse(payload))

    // Redirect to the program page
    history.push(`/programs/${programId}`)
  } catch (error) {
    dispatch(resolveCourses())
    console.log("Error while creating course", error)
  }
}

export const fetchCourses = (programId) => async dispatch => {
  try {
    dispatch(requestCourses())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    const res = await axios.get(`/api/programs/${programId}`, {
      headers: { Authorization: idToken }
    })

    dispatch(getCourses(res.data))
  } catch (error) {
    dispatch(resolveCourses())
    console.log("Error while fetching courses for this program:", error)
  }
}

export const fetchAllCourses = programIds => async dispatch => {
  try {
    dispatch(requestCourses())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    const res = await axios.post(
      '/api/programs/courses/all',
      { programIds },
      { headers: { Authorization: idToken }}
    )

    dispatch(getAllCourses(res.data))
  } catch (error) {
    dispatch(resolveCourses())
    console.log('Error fetching all courses: ', error)
  }
}

export const updateCourse = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    dispatch(requestCourses())
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    const res = await axios.put(
      `/api/courses/${courseId}/edit`,
      values,
      { headers: { Authorization: idToken }}
    )

    dispatch(putCourse(res.data))

    history.push(`/programs/${programId}`)
  } catch (error) {
    dispatch(resolveCourses())
    console.log("Error while updating course.", error)
  }
}

export const deleteCourse = (
  programId,
  courseId,
  history
) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true)

    const payload = {
      programId,
      courseId
    }

    // Dispatching before request because it won't respond with data.
    dispatch(removeCourse(payload))

    await axios.delete(
      `/api/programs/${programId}/courses/${courseId}/delete`,
      { headers: { Authorization: idToken }}
    )

    history.push(`/programs/${programId}`)
  } catch (err) {
    console.log("Error while deleting the course.")
  }
}
