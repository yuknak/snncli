import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Item, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'

////////////////////////////////////////////////////////////////////////////////

import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';

////////////////////////////////////////////////////////////////////////////////

class MyWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
      //Alert.alert(JSON.stringify(this.props.route))
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  render() {
    var uri = this.props.route.params.uri
    return (
      <>
      <WebView source={{uri: uri}} />
      </>
    );
  }
}
////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
  return {
    uiState: state.uiState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNavigation: (navigation,routeName) =>
      dispatch(uiState.setNavigation(navigation,routeName)),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MyWebView)

////////////////////////////////////////////////////////////////////////////////