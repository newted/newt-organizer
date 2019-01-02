import axios from 'axios'
import { showLoading, hideLoading } from 'react-redux-loading'

export const FETCH_USER = 'FETCH_USER'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')

  dispatch(showLoading())

  dispatch({
    type: FETCH_USER,
    payload: res.data
  })

  dispatch(hideLoading())
}
