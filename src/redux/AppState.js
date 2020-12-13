////////////////////////////////////////////////////////////////////////////////

import Action from './Action'
//import QRCode from 'qrcode'

////////////////////////////////////////////////////////////////////////////////
// This is stored in redux-persist
// but it cannot exist between different sessions,
// will be cleared totally when every session error or every logoff

const initialState = {
  
  // Indicates session is valid or not
  authenticated: false,
  
  // API returns 1 record
  rec: {}, // { "get:/barong/resource/users/me":{ key: value, ... }}
  
  // API returns multiple records with page index info
  recs: {},// { "get:/barong/resource/users/activity/all":{
          //      data:[{ key: value, ... },{ key: value, ... },...],
          //      page: 1
          //      per_page: 25
          //      total: 165
          //      }, ...
          //   }
  wallets: [], // { [{id:...,currency:...,balance:...,address:}]}
}

////////////////////////////////////////////////////////////////////////////////
// Merge data (3 kinds and wallets.qr_data_url) into wallets
function buildWallets(state)
{
  var wallets = []
  var currencies = state.recs['get:/peatio/public/currencies']
  var balances = state.recs['get:/peatio/account/balances']
  if (currencies && currencies.data &&
      balances && balances.data) {
    var balance = null
    currencies.data.forEach(currency => {
      balances.data.some(bal => {
        if (bal.currency == currency.id) {
          balance = bal
          return true
        }
      })
      var addressObj = null
      if (state.rec['get:/peatio/account/deposit_address/'+currency.id]) {
        addressObj = state.rec['get:/peatio/account/deposit_address/'+currency.id]
      }
      var wallet = state.wallets.find(rec => rec.id == currency.id)
      var qrObj = {} // Get qr_data_url from wallets if it remains
      if (wallet && wallet.qr_data_url) {
        qrObj = {qr_data_url: wallet.qr_data_url}
      }
      // Merge
      wallets.push(Object.assign(balance, currency, addressObj, qrObj))
    })
  }  
  return wallets
}

////////////////////////////////////////////////////////////////////////////////
// Update a wallet (in order to fill in qr_data_url from address)

function updateWallet(state, wallet)
{
  var wallets = []
  state.wallets.forEach(wallet_rec => {
    if (wallet_rec.id == wallet.id) {
      wallets.push(Object.assign(wallet))
    } else {
      wallets.push(Object.assign(wallet_rec))
    }
  })
  return wallets
}
////////////////////////////////////////////////////////////////////////////////

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case Action.APP_INIT_STATE:
      return initialState // authenticated: false
    case Action.APP_AUTH_SUCCESS: // Login success
      return { ...state, authenticated: true }
    case Action.APP_REC: // 1 record response
    return { ...state,
        rec: {
          ...state.rec, 
          [action.name]:action.response.data
        }}
    case Action.APP_RECS:// multi records response
      return { ...state,
        recs: {
          ...state.recs, 
          [action.name]: {
            // array data
            data: action.response.data,
            // stores current page index info from http response header
            page: action.response.headers['page'],
            per_page: action.response.headers['per-page'],
            total: action.response.headers['total']
          }
        }
      }
    case Action.APP_WALLETS: // build wallets by using already existing data.
      return { ...state, wallets: buildWallets(state) }
    case Action.APP_WALLETS_QR: // put qr_code_url in wallets
      return { ...state, wallets: updateWallet(state, action.wallet) }
    default:
      console.log("AppState reducer: default case called.")
      return state;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Dispatch API response to app reducer

export const dispatchAppSuccess = (dispatch, name, response) => {
  
  //////// Login sessions request handler
  if (
    name === 'post:/barong/identity/sessions') {// Login OK
    dispatch({type: Action.APP_AUTH_SUCCESS, response: response})
  } else if (name === 'get:/barong/resource/users/me') {// Login Check OK
    dispatch({type: Action.APP_AUTH_SUCCESS, response: response})
  } else if (name === 'delete:/barong/identity/sessions') {// Logoff OK -> Session Clear
    dispatch({type: Action.APP_INIT_STATE })
  }

  //////// REC: Returns one record.
  if (
    name.startsWith('get:/barong/resource/users/me') ||
    name.startsWith('get:/peatio/account/deposit_address/') ||
    name.startsWith('get:/peatio/public/markets/tickers') ||
    (name.startsWith('get:/peatio/public/markets/') && name.endsWith('/order-book'))
    ) {
    dispatch({type: Action.APP_REC, response: response, name: name})

  // RECS: Returns multiple records(table) with paging info.
  } else if (
    name.startsWith('get:/barong/resource/users/activity')||
    name.startsWith('get:/peatio/account/balances')||
    name.startsWith('get:/peatio/public/currencies')||
    name.startsWith('get:/peatio/market/trades')||
    name.startsWith('get:/peatio/market/orders')
    ) {
    dispatch({type: Action.APP_RECS, response: response, name: name})
  
  }

  // Build wallets ( A process after / in addtion to REC or RECS)
  if (
    name.startsWith('get:/peatio/account/deposit_address/')||
    name.startsWith('get:/peatio/account/balances')||
    name.startsWith('get:/peatio/public/currencies')
  ) {
    dispatch({type: Action.APP_WALLETS})
  }

}

////////////////////////////////////////////////////////////////////////////////

export const dispatchAppError = (dispatch, name, errResponse) => {

  // Login sessions error
  if (name === 'delete:/barong/identity/sessions'||// Logoff Error
      name === 'get:/barong/resource/users/me') {// Login Check Error -> Session Clear
    dispatch({type: Action.APP_INIT_STATE })
  
  // When any api request gets error
  } else {
    // When auth error detected
    if (errResponse && errResponse.response &&
        errResponse.response.data && errResponse.response.data.errors) {
      var check = JSON.stringify(errResponse.response.data)
      // See Barong errors list
      // https://www.openware.com/sdk/docs/barong/errors.html
      if (check.indexOf('identity.session.')!=-1||
          check.indexOf('authz.')!=-1||
          check.indexOf('jwt.decode_and_verify')!=-1
          ) {
        dispatch({type: Action.APP_INIT_STATE })
      }
    } else {
      // void
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// Asynchronically generate and fill in wallets.qr_data_url
// by using QRCode lib,
// simply convert wallets.address to wallets.qr_data_url
// this should be done asynchronically because of QRCode lib I/F.

export const updateWallets = (wallets) => {
  if (!wallets) {
    return
  }
  /*
  return dispatch => {
    wallets.forEach(async wallet => { // async
      var qr_data_url = null
      if (wallet.address && wallet.address.length > 0) {
        qr_data_url = await QRCode.toDataURL(wallet.address) //await
        if (qr_data_url) {
          wallet['qr_data_url'] = qr_data_url
          // data updating must be done by reducer
          dispatch({type: Action.APP_WALLETS_QR, wallet: wallet})  
        }
      }
    })
  }
  */
}

////////////////////////////////////////////////////////////////////////////////