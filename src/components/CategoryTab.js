
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text,List,ListItem } from 'native-base';
import HomeHeader from './HomeHeader'
import { Alert, RefreshControl,View } from "react-native";
import * as apiState from '../redux/ApiState'
import reducer, * as appState from '../redux/AppState'
import * as uiState from '../redux/UiState'
import { formatDate } from '../lib/Common';

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

////////////////////////////////////////////////////////////////////////////////

class CategoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }
  componentDidMount() {
    //Alert.alert('test')
    this.props.api({
      method: 'get',
      url: '/thread',
      params: {limit: 25, page: 1},
      noLoading: true
    }, ()=>{ 
      this.setState({refreshing: false})
    })
  }
  componentWillUnmount(){
  }
  render() {
    var data = null
    if (this.props.appState.recs['get:/thread']) {
      data = this.props.appState.recs['get:/thread'].data.data
    }
    var params = {}
    params = {limit: 25, page: 1}
    return (
      <Container>
      { /* <HomeHeader {...this.props} /> */ }
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>{             
              this.setState({refreshing: true})
              this.props.api({
                method: 'get',
                url: '/thread',
                params: {limit: 25, page: 1},
                noLoading: true
              }, ()=>{ 
                this.setState({refreshing: false})
              })
          }
          } /> }
        >
        <List
          dataArray={data}
          renderRow={(item) =>

            <ListItem>
              <Text>{item.title}</Text>
            </ListItem>
          }
          keyExtractor={(item, index) => index.toString()}
          />
          </Content>
        </Container>
    )
  }
}

////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
  return {
    apiState: state.apiState,
    appState: state.appState,
    uiState: state.uiState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    api: (params,success,error) =>
      dispatch(apiState.api(params,success,error)),
    /*
    selectMarket: (market) =>
      dispatch(uiState.selectMarket(market)),
    selectOrder: (market, order) =>
      dispatch(uiState.selectOrder(market, order)),
    showAlert: (variant, message) =>
      dispatch(uiState.showAlert(variant, message)),
    */
  }
}
////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTab)

////////////////////////////////////////////////////////////////////////////////
