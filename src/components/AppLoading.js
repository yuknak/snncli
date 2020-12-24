////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux';
import * as uiState from '../redux/UiState'

////////////////////////////////////////////////////////////////////////////////

const AppLoading = (props) => {
  if (props.uiState.loading) {
    return (
      <Spinner color='black' />
    );
  }
  return null;
}

////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
  return {
    uiState: state.uiState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () =>
      dispatch(uiState.startLoading()),
    endLoading: () =>
      dispatch(uiState.endLoading()),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(AppLoading);

////////////////////////////////////////////////////////////////////////////////
