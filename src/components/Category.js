////////////////////////////////////////////////////////////////////////////////

import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab, Container, ScrollableTab } from 'native-base'
import CategoryTab from './CategoryTab'
import { Alert } from "react-native";
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'

////////////////////////////////////////////////////////////////////////////////

class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    }
  }
  searchTabIndex(board_name) {
    var index = 0;
    var ret = 0;
    //Alert.alert('',JSON.stringify(this.props.uiState))
    this.props.uiState.settings.boards.some((board)=>{
      if (board.name == board_name && board.enable) {
        ret = index
        return true
      }
      ++index
    })
    return ret
  } 
  componentDidMount() {
    this.props.initState('test4') // TODO:
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
      if (this.props.route.params && this.props.route.params.boardName) {
        // Jump into activated tab
        var targetBoardName = this.props.route.params.boardName
        var tabIndex = this.searchTabIndex(targetBoardName)
        this.setState({activeTab: tabIndex})

      }

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
        <Tabs page={this.state.activeTab} renderTabBar={()=> <ScrollableTab />}>
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