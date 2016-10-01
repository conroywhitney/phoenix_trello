import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import session from './session'
import registration from './registration'

export default combineReducers({
  registration,
  routing: routeReducer,
  session,
})
