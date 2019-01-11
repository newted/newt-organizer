import axios from 'axios'

export const CREATE_COURSE = 'CREATE_COURSE'
export const FETCH_COURSES = 'FETCH_COURSES'

const createCourse = () => {
  return {
    type: CREATE_COURSE
  }
}

const getCourses = (payload) => {
  return {
    type: FETCH_COURSES,
    payload
  }
}

export const submitCourse = (programId, values, history) => async dispatch => {
  await axios.post(`/api/programs/${programId}/course`, values)

  // Redirect to the program page
  history.push(`/programs/${programId}`)

  dispatch(createCourse())
}

export const fetchCourses = (programId) => async dispatch => {
  try {
    const res = await axios.get(`/api/programs/${programId}`)

    dispatch(getCourses(res.data))
  } catch (err) {
    console.log('Error while fetching courses.')
  }
}
