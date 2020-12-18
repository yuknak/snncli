
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, List,ListItem,Text } from 'native-base';
import HomeHeader from './MyHeader'
import { Alert, RefreshControl,View } from "react-native";
import * as apiState from '../redux/ApiState'
import reducer, * as appState from '../redux/AppState'
import * as uiState from '../redux/UiState'
import { formatDate } from '../lib/Common';
import { brandColors,listItemStyles,formatEpoch } from '../lib/Common';

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
    //Alert.alert('test'+brandDanger)
    this.setState({refreshing: true})
    this.props.api({
      method: 'get',
      url: '/thread/'+this.props.boardName,
      params: {per_page: 50},
      noLoading: true
    }, ()=>{ 
      this.setState({refreshing: false})
    })
  }
  componentWillUnmount(){
  }
  render() {
    var data = null
    if (this.props.appState.recs['get:/thread/'+this.props.boardName]) {
      data = this.props.appState.recs['get:/thread/'+this.props.boardName].data.data
    }
    var params = {}
    params = {per_page: 50}
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
                url: '/thread/'+this.props.boardName,
                params: {limit: 50, page: 1},
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
            <ListItem style={listItemStyles} onPress={()=>{
              this.props.navigation.push("MyWebView",
                {uri:'https://'+this.props.serverName+
                  '/test/read.cgi/'+this.props.boardName+'/'+item.tid+'/-100'})}}>
              <Text>
                 <Text>{formatEpoch(item.tid)}&nbsp;</Text>
                <Text style={{color: brandColors.brandSuccess}}>{item.res_cnt}res&nbsp;</Text>
                <Text style={{color: brandColors.brandDanger}}>{item.res_speed}res/h&nbsp;</Text>
                <Text style={{color: brandColors.brandInfo}}>{Math.round(parseFloat(item.res_percent*10000))/100}%&nbsp;</Text>
                <Text>{item.title}</Text>
              </Text>
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
