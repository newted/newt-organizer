import axios from 'axios'

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
