////////////////////////////////////////////////////////////////////////////////

import { createStore as
  reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appStateReducer from './src/redux/AppState';
//import authStateReducer from './src/redux/AuthState';
import uiStateReducer from './src/redux/UiState';

////////////////////////////////////////////////////////////////////////////////
// Using Redux-Thunk framework

export default function configureStore() {
  const store = reduxCreateStore(
    combineReducers({
      appState: appStateReducer,
      //authState: authStateReducer,
      uiState: uiStateReducer,
    }),
    //applyMiddleware(logger, thunk)
  );
  return store;
}

////////////////////////////////////////////////////////////////////////////////