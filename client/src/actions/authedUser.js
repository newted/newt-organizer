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
    .then(result => {
      const user = result.user

      dispatch(setAuthedUser(user))
    })
    .catch(error => {
      console.log(error)
    })
}
