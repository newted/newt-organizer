import axios from 'axios'

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const UPDATE_ASSIGNMENT = 'UPDATE_COURSE'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'
export const MARK_ASSIGNMENT_COMPLETE = 'MARK_ASSIGNMENT_COMPLETE'
export const MARK_ASSIGNMENT_IN_PROGRESS = 'MARK_ASSIGNMENT_IN_PROGRESS'

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

const markAsComplete = () => {
  return {
    type: MARK_ASSIGNMENT_COMPLETE
  }
}

const markAsInProgress = () => {
  return {
    type: MARK_ASSIGNMENT_IN_PROGRESS
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
    // The custom mongoose command doesn't return anything, so need to redirect
    // first. Needs fixing...
    history.push(`/programs/${programId}/courses/${courseId}`)

    await axios.put(
      `/api/programs/${programId}/courses/${courseId}/assignments/${assignmentId}/edit`,
      values
    )

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

export const completeAssignment = (
  programId,
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    history.push(`/programs/${programId}/courses/${courseId}`)

    await axios.put(
      `/api/programs/${programId}/courses/${courseId}/assignments/${assignmentId}/complete`
    )

    dispatch(markAsComplete())
  } catch (err) {
    console.log("Error while marking assignment as complete", err)
  }
}

export const markAssignmentAsInProgress = (
  programId,
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    history.push(`/programs/${programId}/courses/${courseId}`)

    await axios.put(
      `/api/programs/${programId}/courses/${courseId}/assignments/${assignmentId}/progress`
    )

    dispatch(markAsInProgress())
  } catch (err) {
    console.log("Error while marking assignment as in progress", err)
  }
}
