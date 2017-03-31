import * as appActions from '../actions/appActions';
import { merge, union, forEach} from 'lodash';

const initialState = {
    executeOpenDrawer: false,
    executeCloseDrawer: false
}

const removeByKey = (myObj, deleteKey) => {
  return Object.keys(myObj)
    .filter(key => key !== deleteKey)
    .reduce((result, current) => {
      result[current] = myObj[current];
      return result;
  }, {});
};

const appReducer = (state = initialState, action = {}) => {
  const { authObj } = action;
  switch (action.type) {
    case appActions.OPEN_DRAWER_REQUEST:
      return merge({}, state, { executeOpenDrawer: true });
    case appActions.CLOSE_DRAWER_REQUEST:
      return merge({}, state, { executeCloseDrawer: true });
    case appActions.RESET_EXECUTE_DRAWERS_REQUEST:
      delete state.executeOpenDrawer
      delete state.executeCloseDrawer
      return merge({}, state);
    default:
      return state;
  }
}

export default appReducer
