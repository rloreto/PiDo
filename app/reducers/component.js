'use strict';
import * as actions from '../actions';
import {merge, union, forEach} from 'lodash';

const initialState = {
  listViewData: {
    dataBlob: {},
    sectionIdentities: [],
    rowIdentities: []
  },
  loaded: false
}

const changeComponentValueInDataBlob = (dataBlob, id, value) => {
  Object.keys(dataBlob).forEach((key)=>{
    var component = dataBlob[key];
    if(component && component[id]){
        component[id].value= value;
        return true;
    }
  });
}

const componentReducer = (state = initialState, action = {}) => {
  const { uniqueKey, component } = action;
  switch (action.type) {
    case actions.COMPONENTS.REQUEST:
      return merge( {}, state, {
        isWorking: false,
        loaded: !state.loaded? false: true
      });
      return state;
    case actions.COMPONENTS.FAILURE:
      return state;
    case actions.COMPONENTS.SUCCESS:

      const componentIds= action.response.result;
      const components= action.response.entities.component;
      const sectionIdentities = componentIds.map((id)=> components[id].group);
      sectionIdentities  = sectionIdentities.filter(function(v,i) { return sectionIdentities.indexOf(v) == i; });
      const rowIdentities =[];
      const dataBlob = {};
      sectionIdentities.forEach((section, i)=>{
        const sectionItemIds = componentIds.filter((id)=> components[id].group === section)
                                           .sort((id1, id2)=> components[id1].order > components[id2].order);

                                    
        rowIdentities.push(sectionItemIds);
        sectionItemIds.forEach((id)=>{
          const data =components[id];
            const sectionBlob = dataBlob[section] || {}
            dataBlob[section] = dataBlob[section] || {};
            dataBlob[section][id] = data;
        });
      });

      return merge( {}, state, {
        isWorking: false,
        loaded: true,
        listViewData:{
          dataBlob: dataBlob,
          sectionIdentities: sectionIdentities,
          rowIdentities: rowIdentities
        }
      });
    case actions.COMPONENT_UPDATE.REQUEST:
      return merge({}, state, {
        isWorking: true
      });
    case actions.COMPONENT_UPDATE.SUCCESS:
      if(action.response.entities.component){
        if(state.listViewData && state.listViewData.dataBlob){
          const uniqueId=  action.response.result;
          const componentValue = action.response.entities.component[uniqueId].value;
          changeComponentValueInDataBlob(state.listViewData.dataBlob, uniqueKey, componentValue);
        }
      }
      return merge({}, state, {
        isWorking: true
      });
    default:
      return state;
  }
}

export default componentReducer
