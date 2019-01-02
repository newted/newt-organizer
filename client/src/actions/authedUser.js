import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

const setAuthedUser = (payload) => {
  return {
    type: SET_AUTHED_USER,
    payload
  }
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch(showLoading())

  dispatch(setAuthedUser(res.data))

  dispatch(hideLoading())
}
