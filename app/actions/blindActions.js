import * as types from './actionTypes';



const fetchUpBlindSwitch = (component, targetState) => {
  return {
    [CALL_API]: {
      types: [types.UP_BLIND_REQUEST, types.UP_BLIND_SUCCESS, types.UP_BLIND_FAILURE],
      urlPath: `/api/components/switchBlind/${component._id}`,
      uniqueKey: component._id,
      method: 'PUT',
      schema: Schemas.COMPONENTS,
      body: {
        state: targetState
      }
    }
  }
}

const fetchDownBlindSwitch = (component, targetState) => {
  return {
    [CALL_API]: {
      types: [types.DOWN_BLIND_REQUEST, types.DOWN_BLIND_SUCCESS, types.DOWN_BLIND_FAILURE],
      urlPath: `/api/components/switchBlind/${component._id}`,
      uniqueKey: component._id,
      method: 'PUT',
      schema: Schemas.COMPONENTS,
      body: {
        state: targetState
      }
    }
  }
}

const upStartBlind = (component) => {
  return (dispatch, getState) => {
    return dispatch(fetchUpBlindSwitch(component, 'upStart'))
  }
}
const upStopBlind = (component) => {
  return (dispatch, getState) => {
    return dispatch(fetchUpBlindSwitch(component, 'upStop'))
  }
}
const downStartBlind = (component) => {
  return (dispatch, getState) => {
    return dispatch(fetchDownBlindSwitch(component, 'downStart'))
  }
}
const downStopBlind = (component) => {
  return (dispatch, getState) => {
    return dispatch(fetchDownBlindSwitch(component, 'downStop'))
  }
}


export { upStartBlind, upStopBlind, downStartBlind, downStopBlind }
