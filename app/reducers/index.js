
import { combineReducers } from 'redux';
import component from './component';
import loginReducer from './loginReducer';
import appReducer from './appReducer';

export default combineReducers({
    component, loginReducer, appReducer
})
