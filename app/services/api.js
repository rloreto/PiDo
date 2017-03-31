import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { AsyncStorage } from 'react-native';
import * as utils from '../utils'


const callApi =  (urlPath, schema, method, body) => {

  return AsyncStorage.getItem("authObj").then((value) => {
    var token;

    if(value && value !== 'null'){
      token = JSON.parse(value).token;
      if(!token){
        throw { message: 'Authorization token not found.' }
      }
    }

    return utils.ping().then((domain)=>{
      var fetchObject = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        method: method
      };
      if(token){
        fetchObject.headers.authorization = 'Bearer ' + token
      }

      if (method !== 'GET') {
        fetchObject.body = JSON.stringify( body )
      }

      return fetch(domain + urlPath, fetchObject)
      .then(response =>{
        return  response.json().then(json => ({ json, response }));
      })
      .then(({ json, response }) => {
        if (!response.ok) {
           throw { message: json.msg }
        }
        var normalieObject ={};
        if(json instanceof Array){
          normalieObject = normalize(json, arrayOf(schema));
        } else {
          normalieObject = normalize(json, schema);
        }
        return Object.assign({},normalieObject, {})
      })
      .then(
      response => ({response}),
      error => { 
        return {error: error.message || 'Something bad happened'}
      }
    )
    })
  })

}

const loginSchema = new Schema('login', { idAttribute: 'token' });
const componentSchema = new Schema('component', { idAttribute: '_id' })
const gpioSchema = new Schema('gpio', { idAttribute: '_id' })
componentSchema.define({
  gpios: arrayOf(gpioSchema)
})


// api services
export const login = userLogin => callApi('/login', loginSchema, 'POST', userLogin)
export const getComponents = () => callApi('/api/components', componentSchema, 'GET')
export const updateAudioComponentState = (component) => callApi(`/api/components/switchAudio/${component._id}`, componentSchema, 'PUT', {
  type:"low",
  state: (component.value === 1)?'on':'off'
})


export const updateSocketComponentState = (component) => callApi(`/api/components/socket/${component._id}`, componentSchema, 'PUT', {
  type:"low",
  state: (component.value === 1)?'on':'off'
})

export const updateDimmerComponentState = (component) => callApi(`/api/components/dimmer/${component._id}`, componentSchema, 'PUT', {
  state: 'change'
})

export const updateBlindComponentState = (component) => callApi(`/api/components/switchBlind/${component._id}`, componentSchema, 'PUT', {
  state: component.state
})