import * as types from './actionTypes';
import {Actions} from "react-native-router-flux";
import * as utils from '../utils'
import {AsyncStorage} from 'react-native';

function action(type, payload = {}) {
  return {type, ...payload}
}
export const OPEN_DRAWER = 'OPEN_DRAWER'
export const CLOSE_DRAWER =  'CLOSE_DRAWER'
export const RESET_EXECUTE_DRAWERS = 'RESET_EXECUTE_DRAWERS'

export const OPEN_DRAWER_REQUEST = 'OPEN_DRAWER_REQUEST'
export const CLOSE_DRAWER_REQUEST =  'CLOSE_DRAWER_REQUEST'
export const RESET_EXECUTE_DRAWERS_REQUEST = 'RESET_EXECUTE_DRAWERS_REQUEST'

export const openDrawer = () => action(OPEN_DRAWER)
export const closeDrawer = () => action(CLOSE_DRAWER)
export const resetExecutionStatesForDrawer = () => action(RESET_EXECUTE_DRAWERS)
