import axios from "axios";
import firebase from "../config/firebase";
import { REMOVE_PROGRAMS } from "./programs";
import { REMOVE_COURSES } from "./courses";

export const REQUEST_SIGN_IN_USER = "REQUEST_SIGN_IN_USER";
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER";

const requestSignInUser = () => {
  return {
    type: REQUEST_SIGN_IN_USER
  };
};

export const setAuthedUser = payload => {
  return {
    type: SET_AUTHED_USER,
    payload
  };
};

const removeAuthedUser = () => {
  return {
    type: REMOVE_AUTHED_USER
  };
};

export function isAuthenticated() {
  const user = firebase.auth().currentUser;

  if (user) {
    return true;
  } else {
    return false;
  }
}

// Function to check if the user is authenticated through Firebase and then
// get their data from the database.
export const fetchUser = () => async dispatch => {
  // Returns a Promise so that other requests (like fetching app data) can
  // occur after this resolves.
  return new Promise((resolve, reject) => {
    dispatch(requestSignInUser());
    // Request to Firebase to check if user authenticated
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Make request to get user from database
        axios
          .get(`/api/user/${user.uid}`)
          .then(res => {
            resolve(dispatch(setAuthedUser(res.data)));
          })
          // On error remove user
          .catch(error => {
            dispatch(removeAuthedUser());
            reject("User doesn't exist on database.");
          });
      } else {
        dispatch(removeAuthedUser());
        reject("Not authenticated.");
      }
    });
  });
};

// Function to update a user's personal information
export const updateUser = (userId, values) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to update user information
    const res = await axios.put(`/api/user/${userId}/edit`, values, {
      headers: { Authorization: idToken }
    });

    dispatch(setAuthedUser(res.data));
  } catch (error) {
    console.log("Error while updating user info: ", error);
  }
};

// Function to authenticate with Google
export const authenticateWithGoogle = history => dispatch => {
  // Get Google Provider
  const provider = new firebase.auth.GoogleAuthProvider();
  authenticateWithProvider(provider, history, dispatch);
};

// Function to authenticate with Google
export const authenticateWithGithub = history => dispatch => {
  // Get GitHub Provider
  const provider = new firebase.auth.GithubAuthProvider();
  authenticateWithProvider(provider, history, dispatch);
};

export const signOut = () => async dispatch => {
  await firebase.auth().signOut();
  dispatch(removeAuthedUser());
  // Remove programs
  dispatch({
    type: REMOVE_PROGRAMS
  });
  // Remove courses
  dispatch({
    type: REMOVE_COURSES
  });
};

// General function that uses Firebase authentication service (popup)
// with a given auth provider
async function authenticateWithProvider(provider, history, dispatch) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(async result => {
      // Move it after pop-up sign in flow is complete so the background is
      // still the Login page (and not loading screen)
      dispatch(requestSignInUser());

      const user = result.user;

      // Take only currently necessary info from user object
      const userInfo = {
        _id: user.uid,
        displayName: user.displayName,
        email: user.email
      };

      // Request to create user if doesn't exist, or send back existing user
      // from Mongo DB
      const res = await axios.post("/api/create_user", userInfo);

      dispatch(setAuthedUser(res.data));

      // Redirect to dashboard
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch(removeAuthedUser());
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "Account with the same email already exists with a different provider." +
            "\nSign in using the provider associated with this email address."
        );
      }
    });
}
