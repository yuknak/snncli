////////////////////////////////////////////////////////////////////////////////

import { clockRunning } from 'react-native-reanimated'
import Action from './Action'

////////////////////////////////////////////////////////////////////////////////
// This is redux-persistent,
// keeped between sessions, but if sessionUid is changed(= user changed)
// it will be reinitialized for security.

const initialState = {
  sessionUid: '',     // User id (if changed, total state will be re-inited)
  alertMessage: '',   // Bootstrap4 Alert message body if empty, l'l be erased.
  alertVariant: '',   // Bootstrap4 Alert warning, error ... etc.
  loading: false,     // Bootstrap4 Spinner placed in center of screen
  navigation: null,   // to control react navigation globally
  routeName: '',      // to get global state of react navigation
  settings: {
    boards: [
      {title_cached: "ニュー速", name:"newsplus",
        server_name_cached:"asahi.5ch.net",enable:true},
      {title_cached: "芸スポ", name:"mnewsplus",
        server_name_cached:"hayabusa9.5ch.net",enable:true},
      {title_cached: "東アジア", name:"news4plus",
        server_name_cached:"lavender.5ch.net",enable:true},
      {title_cached: "ビジネス", name:"bizplus",
        server_name_cached:"egg.5ch.net",enable:true},
      {title_cached: "政治", name:"seijinewsplus",
        server_name_cached:"fate.5ch.net",enable:true},
      {title_cached: "国際", name:"news5plus",
        server_name_cached:"egg.5ch.net",enable:true},
      {title_cached: "科学", name:"scienceplus",
        server_name_cached:"egg.5ch.net",enable:true},
      {title_cached: "ローカル", name:"femnewsplus",
        server_name_cached:"egg.5ch.net",enable:true},
      {title_cached: "萌え", name:"moeplus",
        server_name_cached:"egg.5ch.net",enable:true},
      {title_cached: "アイドル", name:"idolplus",
        server_name_cached:"asahi.5ch.net",enable:true},
      {title_cached: "痛い", name:"dqnplus",
        server_name_cached:"egg.5ch.net",enable:true},
    ],
  }
}

////////////////////////////////////////////////////////////////////////////////
// Redux-Thunk framework

export default function reducer(state=initialState, action) {
  // In every call, do nothing with INVALID sessionUid
  // First of all, you have to call initState() with sessionUid
  //if (action.type != Action.UI_INIT_STATE &&
  //    state.sessionUid == '') {
  //    console.log("INVALID sessionUid")
  //    return state // do nothing
  //}
  switch (action.type) {
    case Action.UI_INIT_STATE:
      // INIT data with DIFFERENT id or DO NOTHING with SAME id
      if (state.sessionUid != action.sessionUid) {
        // init with new sessionUid
        return { ...initialState, sessionUid: action.sessionUid}
      } else {
        return state // do nothing
      }
    case Action.UI_ALERT_SHOW:
      return { ...state, alertVariant: action.variant,
        alertMessage: action.message }
    case Action.UI_ALERT_HIDE:      
      return { ...state, alertVariant: '', alertMessage: '' }
    case Action.UI_LOADING_START:      
      return { ...state, loading: true }
    case Action.UI_LOADING_END:      
      return { ...state, loading: false }
    case Action.UI_SET_NAVIGATION:
      console.debug('OUT')
      return { ...state, navigation: action.navigation, routeName: action.routeName }
    default:
      return state;
  }
}

////////////////////////////////////////////////////////////////////////////////

export function initState(sessionUid) {
  return ({type: Action.UI_INIT_STATE,
    sessionUid: sessionUid})
}
export function showAlert(variant, message) {
  return ({type: Action.UI_ALERT_SHOW,
    variant: variant, message: message})
}
export function hideAlert() {
  return ({type: Action.UI_ALERT_HIDE })
}
export function startLoading() {
  return ({type: Action.UI_LOADING_START})
}
export function endLoading() {
  return ({type: Action.UI_LOADING_END})
}
export function setNavigation(navigation, routeName) {
  return ({type: Action.UI_SET_NAVIGATION,
    navigation: navigation, routeName: routeName})
}

////////////////////////////////////////////////////////////////////////////////