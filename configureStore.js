////////////////////////////////////////////////////////////////////////////////

import { createStore as
  reduxCreateStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-community/async-storage';

import apiStateReducer from './src/redux/ApiState';
import appStateReducer from './src/redux/AppState';
import uiStateReducer from './src/redux/UiState';

////////////////////////////////////////////////////////////////////////////////
// Using Redux-Thunk framework with persist and encrypting

const encryptor = encryptTransform({
  secretKey: 'n84BHzJe',
  onError: function(error) {
  }
})

const persistConfig = {
  version: 1,
  key: 'snncli.root',
  storage: AsyncStorage,
  transforms: [encryptor],
  blacklist: ['apiState' /*,'appState','uiState'*/ ]
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    apiState: apiStateReducer,
    appState: appStateReducer,
    uiState: uiStateReducer
  })
)

//TODO: loggers must be only worked at development
//https://hacknote.jp/archives/26111/

const store = reduxCreateStore(
  //persistedReducer, applyMiddleware(logger, thunk)
  persistedReducer, applyMiddleware(thunk)
)

//export const persistor = persistStore(store)
export default store

////////////////////////////////////////////////////////////////////////////////