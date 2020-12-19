////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'

import { Tabs, Tab, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle,ScrollableTab } from 'native-base';
import HomeHeader from './MyHeader'
import HomeTab from './HomeTab';
import { Alert, RefreshControl,View } from "react-native";
import Test from './Test.js'

////////////////////////////////////////////////////////////////////////////////

var board_list = [
  {title: "トップ", key:"top"},
  {title: "新着", key:"latest"},
  {title: "今日", key:"today"},
  {title: "昨日", key:"yesterday"},
  {title: "祭級", key:"festival"},
]

////////////////////////////////////////////////////////////////////////////////

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  render() {
    var tabList = []
    board_list.forEach((item)=> {
      tabList.push(
        <Tab key={item.key} heading={item.title}>
          <HomeTab boardName={item.key} title={item.title} {...this.props}/>
        </Tab>
      )
    })
    return (
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {tabList}
        </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

////////////////////////////////////////////////////////////////////////////////
