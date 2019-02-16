import axios from 'axios'
import firebase from '../config/firebase'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

const setAuthedUser = (payload) => {
  return {
    type: SET_AUTHED_USER,
    payload
  }
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch(setAuthedUser(res.data))
}

export const authenticateWithGoogle = () => async dispatch => {
  // Get Google Provider
  const provider = new firebase.auth.GoogleAuthProvider()

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
      const res = await axios.post('/api/create_user', userInfo)

      dispatch(setAuthedUser(res.data))
    })
    .catch(error => {
      console.log(error)
    })
}
