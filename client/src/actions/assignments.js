import axios from 'axios'

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'

const createAssignment = () => {
  return {
    type: CREATE_ASSIGNMENT
  }
}

export const submitAssignment = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    await axios.post(
      `/api/programs/${programId}/courses/${courseId}/assignments/add`,
      values
    )

    history.push(`/programs/${programId}/courses/${courseId}`)

    dispatch(createAssignment())
  } catch (err) {
    console.log("Error while creating assignment.")
  }
}
