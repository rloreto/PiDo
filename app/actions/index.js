const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

function action(type, payload = {}) {
  return {type, ...payload}
}


export const COMPONENTS = createRequestTypes('COMPONENTS')
export const COMPONENT_UPDATE = createRequestTypes('COMPONENT_UPDATE')
export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')
export const CHECK_AUTH = createRequestTypes('CHECK_AUTH')


export const components = {
  request: () => action(COMPONENTS.REQUEST),
  success: (response) => action(COMPONENTS.SUCCESS, {response}),
  failure: (error) => action(COMPONENTS.FAILURE, {error}),
}
export const componentUpdate = {
  request: (component) => action(COMPONENT_UPDATE.REQUEST,{component}),
  success: (response) => action(COMPONENT_UPDATE.SUCCESS, {response}),
  failure: (error) => action(COMPONENT_UPDATE.FAILURE, {error}),
}
export const login = {
  request: () => action(LOGIN.REQUEST),
  success: (response) => action(LOGIN.SUCCESS, {response}),
  failure: (error) => action(LOGIN.FAILURE, {error}),
}

export const logout = {
  request: () => action(LOGOUT.REQUEST),
  success: (response) => action(LOGOUT.SUCCESS, {response}),
  failure: (error) => action(LOGOUT.FAILURE, {error}),
}

export const CHANGE_AUDIO_SWITCH = 'CHANGE_AUDIO_SWITCH'
export const CHANGE_DIMMER =  'CHANGE_DIMMER'
export const CHANGE_SOCKET = 'CHANGE_SOCKET'
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const LOAD_COMPONENTS = 'LOAD_COMPONENTS'
export const HTTP_UNAUTHORIZED = 'HTTP_UNAUTHORIZED'
export const DO_CHECK_AUTH = 'DO_CHECK_AUTH'
export const UP_BLIND_START = 'UP_BLIND_START'
export const UP_BLIND_STOP = 'UP_BLIND_STOP'
export const DOWN_BLIND_START = 'DOWN_BLIND_START'
export const DOWN_BLIND_STOP = 'DOWN_BLIND_STOP'

export const loadComponents = () => action(LOAD_COMPONENTS)
export const changeAudioSwitch = (component) => action(CHANGE_AUDIO_SWITCH, {component})
export const changeDimmer = (component) => action(CHANGE_DIMMER, {component})
export const changeSocket = (component) => action(CHANGE_SOCKET, {component})
export const upBlind = (component) => action(UP_BLIND, {component})
export const downBlind = (component) => action(DOWN_BLIND, {component})
export const upBlindStart = (component) => action(UP_BLIND_START, {component})
export const upBlindStop = (component) => action(UP_BLIND_STOP, {component})
export const downBlindStart = (component) => action(DOWN_BLIND_START, {component})
export const downBlindStop = (component) => action(DOWN_BLIND_STOP, {component})
//Login actions
export const doLogin = (email, password) => action(DO_LOGIN, {email, password})
export const doLogout = () => action(DO_LOGOUT)
export const doCheckAuth = () => action(DO_CHECK_AUTH)



export const httpUnauthorized = (error) => action(HTTP_UNAUTHORIZED, {error})