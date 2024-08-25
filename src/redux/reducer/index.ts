import { combineReducers } from 'redux'
import { ModeReducer } from '@/redux/reducer/mode'
import { qqLoginReducer } from '@/redux/reducer/login'
const RootReducer = combineReducers({
  ModeReducer,
  qqLoginReducer
})
export default RootReducer
