import axios from "axios";
import firebase from "../config/firebase";
import { REQUEST_COURSES, UPDATE_COURSE } from "./courses";

export const REQUEST_USER_CONTENT = "REQUEST_USER_CONTENT";
export const RESOLVE_USER_CONTENT = "RESOLVE_USER_CONTENT";
export const CREATE_USER_CONTENT = "CREATE_USER_CONTENT";
export const FETCH_USER_CONTENT = "FETCH_USER_CONTENT";
export const UPDATE_USER_CONTENT = "UPDATE_USER_CONTENT";
export const DELETE_USER_CONTENT = "DELETE_USER_CONTENT";

export const fetchIndividualContent = contentId => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to get individual content
    const res = await axios.get(`/api/user-content/${contentId}`, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: FETCH_USER_CONTENT, payload: [res.data] });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCourseContent = courseId => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to get courses content
    const res = await axios.get(`/api/user-content/course/${courseId}`, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: FETCH_USER_CONTENT, payload: res.data });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUserContent = (values, courseId) => async dispatch => {
  try {
    const data = { ...values, courseId };
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to create content
    const userContentRes = await axios.post("/api/user-content/create", data, {
      headers: { Authorization: idToken }
    });

    // Add content id to course
    const courseRes = await axios.put(
      `/api/courses/${courseId}/add-content`,
      {
        userContentId: userContentRes.data._id
      },
      {
        headers: { Authorization: idToken }
      }
    );

    // Dispatch creating user content and updating course
    dispatch({ type: CREATE_USER_CONTENT, payload: userContentRes.data });
    dispatch({ type: UPDATE_COURSE, payload: courseRes.data });
  } catch (error) {
    console.error(error);
  }
};

export const updateUserContent = (userContentId, values) => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to update content
    const res = await axios.put(
      `/api/user-content/${userContentId}/update`,
      values,
      { headers: { Authorization: idToken } }
    );

    dispatch({ type: UPDATE_USER_CONTENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const addQuizToUserContent = (userContentId, data) => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to add quiz to user content
    const res = await axios.put(
      `/api/user-content/${userContentId}/add-quiz`,
      data,
      { headers: { Authorization: idToken } }
    );

    dispatch({ type: UPDATE_USER_CONTENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const updatePagesRead = (userContentId, values) => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to update number of pages read
    const res = await axios.put(
      `/api/user-content/${userContentId}/book-progress`,
      values,
      { headers: { Authorization: idToken } }
    );

    dispatch({ type: UPDATE_USER_CONTENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserContent = (
  userContentId,
  courseId
) => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    dispatch({ type: REQUEST_COURSES });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to delete content
    await axios.delete(`/api/user-content/${userContentId}`, {
      headers: { Authorization: idToken }
    });

    // Make request to update course (delete contentId from it)
    const res = await axios.put(
      `/api/courses/${courseId}/delete-content`,
      { userContentId },
      {
        headers: { Authorization: idToken }
      }
    );

    dispatch({ type: DELETE_USER_CONTENT, payload: userContentId });
    dispatch({ type: UPDATE_COURSE, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

// Youtube URL parser which only does full and short links, among others.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export async function getYoutubeVideoInfo(url) {
  const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regex);

  // Get videoId from url if it exists
  const videoId = match && match[1].length === 11 ? match[1] : null;

  if (videoId) {
    try {
      // Make request to server, which will make YouTube API request.
      const res = await axios.get(`/api/youtube/videoContentInfo/${videoId}`);
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getBookInfo(title, author) {
  const formattedTitle = title.split(" ").join("+");
  const formattedAuthor = author ? author.split(" ").join("+") : null;
  const searchString = formattedAuthor
    ? `${formattedTitle}+${formattedAuthor}`
    : formattedTitle;

  const res = await axios.get(`/api/book-search/${searchString}`);
  return res.data;
}

getBookInfo("bad blood", "carreyrou");
