import {AsyncStorage} from 'react-native';
import * as utils from '../utils'



export const getAuthObj =  () => {
      return AsyncStorage.getItem('authObj', (err, result)=>{
        if(err || result === "{}"){
            return {};
        } else {
            return JSON.parse(result);
        }
    })

}

export const setAuthObj= (authObj) =>{
   var auth =''
   if(authObj){
       auth = JSON.stringify(authObj)
   }
   AsyncStorage.setItem('authObj', auth);
}

export const isAuth = async() => {
  const authStringify = await AsyncStorage.getItem('authObj');
  const authObj = JSON.parse(authStringify);
  return autObj && authObj.token !== '';
}

