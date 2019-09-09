import axios from "axios";
import firebase from "firebase";

export const CREATE_NEW_COURSE = "CREATE_NEW_COURSE";

export async function createCourse(values) {
  // Get current user token
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  // Make request to create course
  const res = await axios.post("/api/courses/create", values, {
    headers: { Authorization: idToken }
  });
  return res.data;
}
