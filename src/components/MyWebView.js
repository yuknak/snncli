import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Platform } from 'react-native'
import { Container, Item, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle,Spinner } from 'native-base';
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
      loading: false
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
    var loadingDiv = (<Spinner color='black'/>)
    const icon = Platform.select({
      ios: (<Icon name="close"/>),
      android: (<Icon style={{color: 'white'}} name="close"/>),
    });
    const run = `
      function clean() {
        document.getElementById('header').remove();
        document.getElementById('main').removeAttribute('class');
        document.getElementsByClassName('socialwrap')[0].remove();
        var len = 0;
        len = document.getElementsByClassName("microad_compass_ad").length;
        for (var i = 0; i < len; ++i) {
          document.getElementsByClassName("microad_compass_ad")[0].remove();
        }
        len = document.getElementsByClassName("res_ad").length;
        for (var i = 0; i < len; ++i) {
          document.getElementsByClassName("res_ad")[0].remove();
        }
        len = document.getElementsByClassName("roninform_wrap").length;
        for (var i = 0; i < len; ++i) {
          document.getElementsByClassName("roninform_wrap")[0].remove();
        }
        len = document.getElementsByClassName("ad").length;
        for (var i = 0; i < len; ++i) {
          document.getElementsByClassName("ad")[0].remove();
        }
        len = document.getElementsByTagName("iframe").length;
        for (var i = 0; i < len; ++i) {
          document.getElementsByTagName("iframe")[0].remove();
        }
      }
      //window.onload = function () {
        clean();
      //};
      true;
    `;
    setTimeout(() => {
      if (this.webref) {
        this.webref.injectJavaScript(run);
      }
    }, 7000);
    return (
      <Container>
        {this.state.loading ? loadingDiv : null}
        <WebView
          ref={(r) => (this.webref = r)}
          source={{uri: uri}}
          onLoad={()=>{  }}
          onLoadEnd={()=>{this.setState({loading: false})}}
          onLoadStart={()=>{this.setState({loading: true})}}
        />
        <Footer>
          <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
            {icon}
          </Button>
        </Footer>
      </Container>
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