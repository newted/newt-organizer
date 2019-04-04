import axios from "axios";
import firebase from "../config/firebase";
import _ from "lodash";

export const REQUEST_PROGRAMS = "REQUEST_PROGRAMS";
export const RESOLVE_PROGRAMS = "RESOLVE_PROGRAMS";
export const REMOVE_PROGRAMS = "REMOVE_PROGRAMS";
export const CREATE_PROGRAM = "CREATE_PROGRAM";
export const FETCH_PROGRAMS = "FETCH_PROGRAMS";
export const UPDATE_PROGRAM = "UPDATE_PROGRAM";
export const DELETE_PROGRAM = "DELETE_PROGRAM";

export const requestPrograms = () => {
  return {
    type: REQUEST_PROGRAMS
  };
};

const resolvePrograms = () => {
  return {
    type: RESOLVE_PROGRAMS
  };
};

// Function to create a program
export const createProgram = (values, history) => async dispatch => {
  try {
    dispatch(requestPrograms());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Request returns the created program
    const res = await axios.post("/api/programs", values, {
      headers: { Authorization: idToken }
    });

    // Dispatch data to store
    dispatch({
      type: CREATE_PROGRAM,
      payload: res.data
    });

    // Redirect to programs page
    history.push("/programs");
  } catch (error) {
    dispatch(resolvePrograms());
    console.log("Error while creating program", error);
  }
};

// Function to fetch programs
export const fetchPrograms = () => async dispatch => {
  try {
    dispatch(requestPrograms());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Send token to server through Authorization header
    const res = await axios.get("/api/programs", {
      headers: { Authorization: idToken }
    });

    // Sort program by date it was created
    const programs = _.sortBy(
      res.data,
      ({ dateCreated }) => new Date(dateCreated)
    );

    // Dispatch data to store
    dispatch({
      type: FETCH_PROGRAMS,
      payload: programs
    });
  } catch (error) {
    dispatch(resolvePrograms());
    console.log("Error while fetching programs.", error);
  }
};

// Function to update a program
export const updateProgram = (programId, values, history) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Request returns updated program
    const res = await axios.put(`/api/programs/${programId}/edit`, values, {
      headers: { Authorization: idToken }
    });

    // Dispatch data to store
    dispatch({
      type: UPDATE_PROGRAM,
      payload: res.data
    });

    // Redirect to programs tab
    history.push("/programs");
  } catch (error) {
    dispatch(resolvePrograms());
    console.log("Error while updating program.", error);
  }
};

// Function to delete a program
export const deleteProgram = (programId, history) => async dispatch => {
  try {
    dispatch(requestPrograms());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Dispatching before request because it won't respond with data.
    dispatch({
      type: DELETE_PROGRAM,
      payload: programId
    });

    // Request to delete a program
    await axios.delete(`/api/programs/${programId}`, {
      headers: { Authorization: idToken }
    });

    // Redirect to programs tab
    history.push("/programs");
  } catch (error) {
    dispatch(resolvePrograms());
    console.log("Error while deleting program.", error);
  }
};
