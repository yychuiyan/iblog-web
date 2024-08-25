import { combineReducers } from 'redux'
import { ModeReducer } from '@/redux/reducer/mode'
import { QQLoginReducer } from '@/redux/reducer/login'
const RootReducer = combineReducers({
  ModeReducer,
  QQLoginReducer
})
export default RootReducer
