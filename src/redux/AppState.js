////////////////////////////////////////////////////////////////////////////////

import axios from 'axios'
//import Cookies from 'js-cookie'
import Action from './Action'
//import { getApiPath } from '../lib/Common';

////////////////////////////////////////////////////////////////////////////////
// This is common for all axios requests

const AXIOS_CONFIG = {
  //apiUrl: getApiPath() + '/v1',
  apiUrl: 'http://localhost:3000/api/v1',
}

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  // -------- apiRequest
  //name: '',       // axios call name
  response: {},     // axios's entire response
  fetching: false,  // Indiates async request is ongoing
  success: false,   // Request success:true or fail:false
  // -------- appData
  dataAccount :{}, // data for Account
  dataItems : {}, // data for Items(with pagenation info)
  dataItem : {}, // data for Item
  dataProvenances : [], // data for Provenances
  dataResult : {}, // data for Other
}

////////////////////////////////////////////////////////////////////////////////
// Clear app state

export function clearAppState() {
  initialState.response = {}
  initialState.fetching = false
  initialState.success = false
  initialState.dataAccount = {}
  initialState.dataItems = {}
  initialState.dataItem = {}
  initialState.dataProvenances = []
  initialState.dataResult = {}
}

////////////////////////////////////////////////////////////////////////////////
// Redux-Thunk framework

export default function reducer(state=initialState, action) {
  switch (action.type) {
    // API
    case Action.API_CALL_START:
      return { ...state, success: false, fetching: true }
    case Action.API_CALL_SUCCESS:
      return { ...state, success: true, response: action.response, fetching: false }
    case Action.API_CALL_ERROR:
       return { ...state, success: false,  response: action.response, fetching: false }
    // DATA
    case Action.APP_DATA_ACCOUNT:
      return { ...state, dataAccount: action.response.data }
    case Action.APP_DATA_ITEMS:
        return { ...state, dataItems: action.response.data }
    case Action.APP_DATA_ITEM:
        return { ...state, dataItem: action.response.data }
    case Action.APP_DATA_PROVENANCES:
        return { ...state, dataProvenances: action.response.data }
    case Action.APP_DATA_RESULT:
        return { ...state, dataResult: action.response.data }
    default:
      return state;
  }
}

////////////////////////////////////////////////////////////////////////////////

function buildErrorMessage(response)
{
  console.log(JSON.stringify(response))
  let message = "Error";
  if (!response) { return message }
  if (response.status === 400 &&
    response.data && response.data.error) {
    message = response.data.error // grapi api: error!("Errmsg", 400))
  } else {
    message = JSON.stringify(response)
  }
  return message;
}

////////////////////////////////////////////////////////////////////////////////
// Convert API response to application data

const dispatchAppData = (dispatch, name, response) => {
  
  // get

  if (name === 'get:/user_account') {
    dispatch({type: Action.APP_DATA_ACCOUNT, response: response})
  } else if (name.startsWith('get:/item_file/')) {
    dispatch({type: Action.APP_DATA_RESULT, response: response})
  } else if (name.startsWith('get:/item/')) {
    dispatch({type: Action.APP_DATA_ITEM, response: response})
  } else if (name.startsWith('get:/item')) { 
    dispatch({type: Action.APP_DATA_ITEMS, response: response})
  } else if (name.startsWith('get:/public_item/')) {
    dispatch({type: Action.APP_DATA_ITEM, response: response})
  } else if (name.startsWith('get:/public_item')) {
    dispatch({type: Action.APP_DATA_ITEMS, response: response})
  } else if (name.startsWith('get:/transfer/incoming')||
              name.startsWith('get:/transfer/outgoing')) {
    dispatch({type: Action.APP_DATA_ITEMS, response: response})
  } else if (name.startsWith('get:/provenance/')) {
    dispatch({type: Action.APP_DATA_PROVENANCES, response: response})
  } else if (name.startsWith('get:/public_provenance/')) {
    dispatch({type: Action.APP_DATA_PROVENANCES, response: response})

  // put/post
  } else if (name.startsWith('post:/item_file')) {
    dispatch({type: Action.APP_DATA_RESULT, response: response})
  } else {
    console.log("Not found dispatchAppData entry.")
  }
}

////////////////////////////////////////////////////////////////////////////////
// API call by axios
// Axios call params:
// {method: 'get', url: '/user_account' data { key : value, ... }}

export const apiRequest = (params, success=()=>{}, error=()=>{}) => {
  params.baseURL = AXIOS_CONFIG.apiUrl
  // auth info is automatically stored in cookie by j-toker lib
//  params.headers = JSON.parse(Cookies.get('authHeaders'))
  params.validateStatus = function (status) { // what is success?
    //return status >= 200 && status < 300; // default
    // default + clinet bad request(400)
    return (status >= 200 && status < 300) || (status === 400)
  }
  let name = params.method + ':' + params.url
  return dispatch => {
    dispatch({type: Action.LOADING_START})
    dispatch({ type: Action.API_CALL_START, name: name})
    axios.request(params).then((response) => { // success
      if (response.status === 400) // bad request
      { // error(400)
        // placed here in order to get custom err msg from server
        dispatch({type: Action.API_CALL_ERROR,
          name: name,  response: response})
        dispatch({type: Action.ALERT_SHOW,
          variant: 'warning', message: buildErrorMessage(response) })
        dispatch({type: Action.LOADING_END})
        error(response)
  
      } else {
        //success
        dispatch({type: Action.API_CALL_SUCCESS,
          name: name,  response: response})
        dispatch({type: Action.LOADING_END})
        dispatchAppData(dispatch, name, response)
        success(response)  
      }
    }).catch((response) => {
      // error(5xx or other)
      dispatch({type: Action.API_CALL_ERROR,
        name: name,  response: response})
      dispatch({type: Action.ALERT_SHOW,
        variant: 'warning', message: buildErrorMessage(response) })
      dispatch({type: Action.LOADING_END})
      error(response)
    })
  }
}

////////////////////////////////////////////////////////////////////////////////
