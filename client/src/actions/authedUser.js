import axios from 'axios'
import firebase from '../config/firebase'

export const REQUEST_SIGN_IN_USER = 'REQUEST_SIGN_IN_USER'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const REMOVE_AUTHED_USER = 'REMOVE_AUTHED_USER'

const requestSignInUser = () => {
  return {
    type: REQUEST_SIGN_IN_USER
  }
}

const setAuthedUser = (payload) => {
  return {
    type: SET_AUTHED_USER,
    payload
  }
}

const removeAuthedUser = () => {
  return {
    type: REMOVE_AUTHED_USER
  }
}


export function isAuthenticated() {
  const user = firebase.auth().currentUser

  if (user) {
    return true
  } else {
    return false
  }
}

export const fetchUser = () => async dispatch => {
  return new Promise((resolve, reject) => {
    dispatch(requestSignInUser())
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(
          dispatch(
            setAuthedUser({
              _id: user.uid,
              displayName: user.displayName,
              email: user.email
            })
          )
        )
      } else {
        dispatch(removeAuthedUser())
        reject("Not authenticated.")
      }
    })
  })
}

export const authenticateWithGoogle = (history) => async dispatch => {
  // Get Google Provider
  const provider = new firebase.auth.GoogleAuthProvider()

  dispatch(requestSignInUser())

  firebase.auth().signInWithPopup(provider)
    .then(async result => {
      const user = result.user

      // Take only currently necessary info from user object
      const userInfo = {
        _id: user.uid,
        displayName: user.displayName,
        email: user.email
      }

      // Request to create user if doesn't exist, or send back existing user
      // from Mongo DB
      await axios.post('/api/create_user', userInfo)

      dispatch(setAuthedUser(userInfo))

      // Redirect to dashboard
      history.push('/dashboard')
    })
    .catch(error => {
      dispatch(removeAuthedUser())
      console.log(error)
    })
}

export const signOut = () => async dispatch => {
  await firebase.auth().signOut()

  dispatch(removeAuthedUser())
}
