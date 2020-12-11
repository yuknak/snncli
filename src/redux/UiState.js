////////////////////////////////////////////////////////////////////////////////

import Action from './Action'

////////////////////////////////////////////////////////////////////////////////

const initialState = {
  alertMessage: '',   // Bootstrap4 Alert message body if empty, disappeared.
  alertVariant: '',   // Bootstrap4 Alert warning, error ... etc.
  loading: false,     // Bootstrap4 Spinner placed in center of screen
}

////////////////////////////////////////////////////////////////////////////////
// Clear ui state

export function clearUiState() {
  initialState.alertMessage = ''
  initialState.alertVariant = ''
  initialState.loading = false
}

////////////////////////////////////////////////////////////////////////////////
// Redux-Thunk framework

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case Action.ALERT_SHOW:
      return { ...state, alertVariant: action.variant,
        alertMessage: action.message }
    case Action.ALERT_HIDE:      
      return { ...state, alertVariant: '', alertMessage: '' }
    case Action.LOADING_START:      
      return { ...state, loading: true }
    case Action.LOADING_END:      
      return { ...state, loading: false }
    default:
      return state;
  }
}

////////////////////////////////////////////////////////////////////////////////

export function showAlert(variant, message) {
  return ({type: Action.ALERT_SHOW,
    variant: variant, message: message})
}

export function hideAlert() {
  return ({type: Action.ALERT_HIDE })
}

export function startLoading() {
  return ({type: Action.LOADING_START})
}

export function endLoading() {
  return ({type: Action.LOADING_END})
}

////////////////////////////////////////////////////////////////////////////////