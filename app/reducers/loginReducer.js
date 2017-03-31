import * as actions from '../actions';
import { merge, union, forEach} from 'lodash';
import { isAuth, setAuthObj } from '../services/security'


const initialState = {
    isAuth: false,
    authObj: null,
    isLoading: false,
    pendingToChechAuth: true,
    error: null
}

const loginReducer = (state = initialState, action = {}) => {
  const { authObj } = action;
  switch (action.type) {
    case actions.LOGIN.REQUEST:
      return merge({}, state, { isLoading: true, error: '' });
    case actions.LOGIN.SUCCESS:
      var obj = {token: action.response.result}
      setAuthObj(obj)
     return merge({}, state, { isAuth: true, authObj: obj, isLoading: false, error: ''});
    case actions.LOGIN.FAILURE:
      setAuthObj(null);
      return merge( {}, state, { isAuth: false, authObj: null, isLoading: false, error: action.error  });
    case actions.LOGOUT.REQUEST:
      return merge({}, state, {});
    case actions.LOGOUT.SUCCESS:
     return merge({}, state, { isAuth: false, authObj: null, isLoading: false});
    case actions.LOGOUT.FAILURE:
      return merge({}, state, {});
    case actions.CHECK_AUTH.REQUEST:
      return merge({}, state, { isAuth: false, pendingToChechAuth: true });
    case actions.CHECK_AUTH.SUCCESS:
      const isAuth = action.authObj && action.authObj.token !== '';
     return merge({}, state, { isAuth: isAuth, pendingToChechAuth: false});
    case actions.CHECK_AUTH.FAILURE:
      return merge( {}, state, { isAuth: false, pendingToChechAuth: false });
    default:
      return state;
  }
}

export default loginReducer
