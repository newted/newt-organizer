import axios from 'axios'

export const CREATE_COURSE = 'CREATE_COURSE'

const createCourse = () => {
  return {
    type: CREATE_COURSE
  }
}

export const submitCourse = (programId, values, history) => async dispatch => {
  await axios.post(`/api/programs/${programId}/course`, values)

  // Redirect to the program page
  history.push(`/programs/${programId}`)

  dispatch(createCourse())
}
