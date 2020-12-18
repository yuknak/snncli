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
    this.props.initState('test3') // TODO:
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
  }
  render() {
    var tabList = []
    if (!this.props.uiState.settings||!this.props.uiState.settings.boards) {
      return null
    }
    this.props.uiState.settings.boards.forEach((item)=> {
      if (item.enable) {
        tabList.push(
          <Tab key={item.name} heading={item.title_cached}>
            <CategoryTab
              boardName={item.name}
              title={item.title_cached}
              serverName={item.server_name_cached}
              {...this.props}/>
          </Tab>
        )
      }
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