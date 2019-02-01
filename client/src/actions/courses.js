import axios from 'axios'

export const CREATE_COURSE = 'CREATE_COURSE'
export const FETCH_COURSES = 'FETCH_COURSES'
export const FETCH_ALL_COURSES = 'FETCH_ALL_COURSES'
export const UPDATE_COURSE = 'UPDATE_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'

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
  const res = await axios.post(`/api/programs/${programId}/course`, values)

  const payload = {
    course: res.data,
    programId
  }

  dispatch(createCourse(payload))

  // Redirect to the program page
  history.push(`/programs/${programId}`)
}

export const fetchCourses = (programId) => async dispatch => {
  const res = await axios.get(`/api/programs/${programId}`)

  dispatch(getCourses(res.data))
}

export const fetchAllCourses = programIds => async dispatch => {
  const res = await axios.post('/api/programs/courses/all', { programIds })

  dispatch(getAllCourses(res.data))
}

export const updateCourse = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    const res = await axios.put(`/api/courses/${courseId}/edit`, values)

    dispatch(putCourse(res.data))

    history.push(`/programs/${programId}`)
  } catch (err) {
    console.log("Error while updating course.")
  }
}

export const deleteCourse = (
  programId,
  courseId,
  history
) => async dispatch => {
  try {
    const payload = {
      programId,
      courseId
    }

    // Dispatching before request because it won't respond with data.
    dispatch(removeCourse(payload))

    await axios.delete(`/api/programs/${programId}/courses/${courseId}/delete`)

    history.push(`/programs/${programId}`)
  } catch (err) {
    console.log("Error while deleting the course.")
  }
}
