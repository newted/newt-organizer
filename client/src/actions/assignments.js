import axios from 'axios'

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'

const createAssignment = () => {
  return {
    type: CREATE_ASSIGNMENT
  }
}

const removeAssignment = () => {
  return {
    type: DELETE_ASSIGNMENT
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

export const deleteAssignment = (
  programId,
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    await axios.delete(
      `/api/programs/${programId}/courses/${courseId}/assignments/${assignmentId}`
    )

    history.push(`/programs/${programId}/courses/${courseId}`)

    dispatch(removeAssignment())
  } catch (err) {
    console.log("Error while deleting the assignment", err);
  }
}
