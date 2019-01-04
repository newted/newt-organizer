import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
  form: formReducer
})
