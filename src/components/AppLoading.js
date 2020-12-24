////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { View } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux';
import * as uiState from '../redux/UiState'
import {ProgressBar} from '@react-native-community/progress-bar-android'

////////////////////////////////////////////////////////////////////////////////
//      <Spinner color='black' />


const AppLoading = (props) => {
  if (props.uiState.loading) {
    //return null
    return (
      <ProgressBar
        styleAttr="Horizontal"
        indeterminate={true}
      />
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
