/* eslint-disable no-constant-condition */
import { take, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import { Actions } from 'react-native-router-flux'
import { api, history, security } from '../services'
import { usernameSelector, passwordSelector } from '../reducers/selectors'
import * as actions from '../actions'
import * as appActions from '../actions/appActions'

const { components, componentUpdate, login } = actions


function* fetchEntity(entity, apiFn, args) {
  if(!entity){
    throw 'The entity is required'
  }
  if(!apiFn){
    throw 'The apiFn is required'
  }
  yield put(entity.request(args))
  const {response, error} = yield call(apiFn, args)
  if(response){
    yield put(entity.success(response))
  }
  else {
    yield put(entity.failure(error))

    if(error==='Unauthorized'){
          debugger;
      yield put(actions.httpUnauthorized(error))
    }
  }
}

//Fetchs
export const fetchGetComponents  = fetchEntity.bind(null, components, api.getComponents)
export const fetchUpdateAudioComponentState = fetchEntity.bind(null, componentUpdate, api.updateAudioComponentState)
export const fetchUpdateSocketComponentState = fetchEntity.bind(null, componentUpdate, api.updateSocketComponentState)
export const fetchUpdateDimmerComponentState = fetchEntity.bind(null, componentUpdate, api.updateDimmerComponentState)
export const fetchUpdateBlindComponentState = fetchEntity.bind(null, componentUpdate, api.updateBlindComponentState)
export const fetchLoginData  = fetchEntity.bind(null, login, api.login)




//Execution
function* doGetComponent(){
  yield call(fetchGetComponents)
}
function* doCheckAuth() {
   try {
      yield put({type: actions.CHECK_AUTH.REQUEST})
      const authObj = yield call(security.getAuthObj)
      authObj = JSON.parse(authObj);
      if(!authObj){
        yield put({type: actions.CHECK_AUTH.FAILURE, error:"Token not found"})
      } else {
        yield put({type: actions.CHECK_AUTH.SUCCESS, authObj})
      }
      
   } catch (error) {
      yield put({type: actions.CHECK_AUTH.FAILURE, error})
   }
}
function* doLogin(email, password){
  yield call(fetchLoginData, {email, password} )
}
function* doLogout(){
  try{
    yield put({type: actions.LOGOUT.REQUEST})
    yield call(security.setAuthObj, null)
    yield put({type: actions.LOGOUT.SUCCESS})
    yield call(Actions.login,{ hideNavBar: true})
  } catch (error) {
    yield put({type: actions.LOGOUT.FAILURE, error})
   }
}
function* doChangeAudioSwitch(component){
  component.value = 1 - component.value;
  yield call(fetchUpdateAudioComponentState, component)
}
function* doChangeSocket(component){
  component.value = 1 - component.value;
  yield call(fetchUpdateSocketComponentState, component)
}

function* doChangeDimmer(component){
  yield call(fetchUpdateDimmerComponentState, component)
}

function* doUpBlindStart(component){
  component.state = 'upStart';
  yield call(fetchUpdateBlindComponentState, component)
}

function* doUpBlindStop(component){
  component.state = 'upStop';
  yield call(fetchUpdateBlindComponentState, component)
}

function* doDownBlindStart(component){
  component.state = 'downStart';
  yield call(fetchUpdateBlindComponentState, component)
}

function* doDownBlindStop(component){
  component.state = 'downStop';
  yield call(fetchUpdateBlindComponentState, component)
}


function* doOpenDrawer(component){
   yield put({type: appActions.OPEN_DRAWER_REQUEST})
}

function* doCloseDrawer(component){
   yield put({type: appActions.CLOSE_DRAWER_REQUEST})
}

function* doResetExecuteDrawers(component){
   yield put({type: appActions.RESET_EXECUTE_DRAWERS_REQUEST})
}




//Watchers
function* watchDoLogin() {
    while(true) {
        var { email, password } = yield take(actions.DO_LOGIN)
        yield fork(doLogin, email, password)
    }
}
function* watchDoLogout() {
    while(true) {
        yield take(actions.DO_LOGOUT)
        yield fork(doLogout)
    }
}

function* watchDoCheckAuth() {
    while(true) {
        yield take(actions.DO_CHECK_AUTH)
        yield fork(doCheckAuth)
    }
}

function* watchLoadComponents() {
    while(true) {
        yield take(actions.LOAD_COMPONENTS)
        yield fork(doGetComponent)
    }
}


function* watchChangeAudioSwitch(component) {
  while(true) {
      var { component } = yield take(actions.CHANGE_AUDIO_SWITCH)
      yield fork(doChangeAudioSwitch, component)
  }
}

function* watchChangeSocket(component) {
  while(true) {
      var { component } = yield take(actions.CHANGE_SOCKET)
      yield fork(doChangeSocket, component)
  }
}

function* watchChangeDimmer(component) {
  while(true) {
      var { component } = yield take(actions.CHANGE_DIMMER)
      yield fork(doChangeDimmer, component)
  }
}

function* watchUpBlindStart(component) {
  while(true) {
      var { component } = yield take(actions.UP_BLIND_START)
      yield fork(doUpBlindStart, component)
  }
}
function* watchUpBlindStop(component) {
  while(true) {
      var { component } = yield take(actions.UP_BLIND_STOP)
      yield fork(doUpBlindStop, component)
  }
}
function* watchDownBlindStart(component) {
  while(true) {
      var { component } = yield take(actions.DOWN_BLIND_START)
      yield fork(doDownBlindStart, component)
  }
}
function* watchDownBlindStop(component) {
  while(true) {
      var { component } = yield take(actions.DOWN_BLIND_STOP)
      yield fork(doDownBlindStop, component)
  }
}

function* watchOpenDrawer(component) {
  while(true) {
      yield take(appActions.OPEN_DRAWER)
      yield fork(doOpenDrawer)
  }
}

function* watchCloseDrawer(component) {
  while(true) {
      yield take(appActions.CLOSE_DRAWER)
      yield fork(doCLoseDrawer)
  }
}

function* watchResetExecuteDrawers(component) {
  while(true) {
      yield take(appActions.RESET_EXECUTE_DRAWERS)
      yield fork(doResetExecuteDrawers)
  }
}

//Navigations
function* watchLoginSuccess() {
    while(true) {
      yield take(actions.LOGIN.SUCCESS)
      yield fork(Actions.main)
    }
}
function* watchCheckTokenSuccess() {
    while(true) {
      yield take(actions.CHECK_AUTH.SUCCESS)
      yield fork(Actions.main)
    }
}
function* watchHttpUnauthorized(error) {
    while(true) {
      yield take(actions.HTTP_UNAUTHORIZED)
      yield fork(Actions.main)
    }
}


export default function* root() {
  yield [
    fork(watchDoLogin),
    fork(watchDoLogout),
    fork(watchDoCheckAuth),
    fork(watchLoadComponents),
    fork(watchChangeAudioSwitch),
    fork(watchChangeSocket),
    fork(watchChangeDimmer),
    fork(watchUpBlindStart),
    fork(watchUpBlindStop),
    fork(watchDownBlindStart),
    fork(watchDownBlindStop),
    fork(watchOpenDrawer),
    fork(watchCloseDrawer),
    fork(watchResetExecuteDrawers),
    /*For navigations*/
    fork(watchLoginSuccess),
    fork(watchCheckTokenSuccess),
    fork(watchHttpUnauthorized)

  ]
}