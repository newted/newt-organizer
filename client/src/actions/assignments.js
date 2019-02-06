import axios from 'axios'

export const CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT'
export const UPDATE_ASSIGNMENT = 'UPDATE_COURSE'
export const DELETE_ASSIGNMENT = 'DELETE_ASSIGNMENT'
export const MARK_ASSIGNMENT_COMPLETE = 'MARK_ASSIGNMENT_COMPLETE'
export const MARK_ASSIGNMENT_IN_PROGRESS = 'MARK_ASSIGNMENT_IN_PROGRESS'

const createAssignment = (payload) => {
  return {
    type: CREATE_ASSIGNMENT,
    payload
  }
}

const putAssignment = (payload) => {
  return {
    type: UPDATE_ASSIGNMENT,
    payload
  }
}

const removeAssignment = (payload) => {
  return {
    type: DELETE_ASSIGNMENT,
    payload
  }
}

const markAsComplete = (payload) => {
  return {
    type: MARK_ASSIGNMENT_COMPLETE,
    payload
  }
}

const markAsInProgress = (payload) => {
  return {
    type: MARK_ASSIGNMENT_IN_PROGRESS,
    payload
  }
}

export const submitAssignment = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    const res = await axios.post(`/api/courses/${courseId}/assignment`, values)

    dispatch(createAssignment(res.data))

    history.push(`/programs/${programId}/courses/${courseId}`)
  } catch (err) {
    console.log("Error while creating assignment.")
  }
}

export const updateAssignment = (
  courseId,
  assignmentId,
  values,
  history
) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/edit`,
      values
    )

    dispatch(putAssignment(res.data))

    history.goBack()
  } catch (err) {
    console.log("Error while updating assignment", err)
  }
}

export const deleteAssignment = (
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/courses/${courseId}/assignments/${assignmentId}`
    )

    dispatch(removeAssignment(res.data))
  } catch (err) {
    console.log("Error while deleting the assignment", err);
  }
}

export const completeAssignment = (
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/complete`
    )

    dispatch(markAsComplete(res.data))
  } catch (err) {
    console.log("Error while marking assignment as complete", err)
  }
}

export const markAssignmentAsInProgress = (
  courseId,
  assignmentId,
  history
) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/progress`
    )

    dispatch(markAsInProgress(res.data))
  } catch (err) {
    console.log("Error while marking assignment as in progress", err)
  }
}
