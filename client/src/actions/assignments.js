import axios from 'axios'

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const UPDATE_ASSIGNMENT = 'UPDATE_COURSE'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'

const createAssignment = () => {
  return {
    type: CREATE_ASSIGNMENT
  }
}

const putAssignment = () => {
  return {
    type: UPDATE_ASSIGNMENT
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

export const updateAssignment = (
  programId,
  courseId,
  assignmentId,
  values,
  history
) => async dispatch => {
  try {
    await axios.put(
      `/api/programs/${programId}/courses/${courseId}/assignments/${assignmentId}/edit`
    )

    history.push(`/programs/${programId}/courses/${courseId}`)

    dispatch(putAssignment())
  } catch (err) {
    console.log("Error while updating assignment", err)
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
