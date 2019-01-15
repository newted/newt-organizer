import axios from 'axios'

export const CREATE_COURSE = 'CREATE_COURSE'
export const UPDATE_COURSE = 'UPDATE_COURSE'

const createCourse = () => {
  return {
    type: CREATE_COURSE
  }
}

const putCourse = () => {
  return {
    type: UPDATE_COURSE
  }
}

export const submitCourse = (programId, values, history) => async dispatch => {
  await axios.post(`/api/programs/${programId}/course`, values)

  // Redirect to the program page
  history.push(`/programs/${programId}`)

  dispatch(createCourse())
}

export const updateCourse = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    await axios.put(`/api/programs/${programId}/courses/${courseId}/edit`, values)

    history.push(`/programs/${programId}/courses/${courseId}`)

    dispatch(putCourse())
  } catch (err) {
    console.log("Error while updating course.")
  }
}
