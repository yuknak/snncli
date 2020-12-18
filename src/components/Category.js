////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab, Container, ScrollableTab } from 'native-base'
import CategoryTab from './CategoryTab'
import { Alert } from "react-native";
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'

////////////////////////////////////////////////////////////////////////////////

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  } 
  componentDidMount() {
    this.props.initState('test1')
    //Alert.alert("debug", JSON.stringify(this.props.uiState))
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  render() {
    var tabList = []
    this.props.uiState.settings.boards.forEach((item)=> {
      tabList.push(
        <Tab key={item.name} heading={item.title_cached}>
          <CategoryTab
            boardName={item.name}
            title={item.title_cached}
            serverName={item.server_name_cached}
            {...this.props}/>
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
    initState: (sessionUid) =>
      dispatch(uiState.initState(sessionUid)),
    setNavigation: (navigation,routeName) =>
      dispatch(uiState.setNavigation(navigation,routeName)),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Category)

////////////////////////////////////////////////////////////////////////////////