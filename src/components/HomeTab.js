
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text,List,ListItem,Left,Right,Button,Icon,Body } from 'native-base';
import { Alert, RefreshControl,View } from "react-native";
import * as apiState from '../redux/ApiState'
import { brandColors, formatEpoch, listItemStyles, listHeaderStyles } from '../lib/Common';

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

////////////////////////////////////////////////////////////////////////////////

class HomeTab extends Component {
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
      url: '/thread/newsplus',
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
    if (this.props.appState.recs['get:/thread/newsplus']) {
      data = this.props.appState.recs['get:/thread/newsplus'].data.data
    }
    var params = {}
    params = {limit: 50, page: 1}
    //board_name = this.props.boardName
    board_name = 'newsplus'
    return (
      <Container>
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>{             
              this.setState({refreshing: true})
              this.props.api({
                method: 'get',
                url: '/thread/newsplus',
                params: {per_page: 50},
                noLoading: true
              }, ()=>{ 
                this.setState({refreshing: false})
              })
          }
          } /> }
        >
        <List>
        <ListItem icon>
        <Left>
          <Button>
            <Icon name="newspaper" />
          </Button>
        </Left>
        <Body>
          <Text>{this.props.title}</Text>
        </Body>
        <Right>
        </Right>
        </ListItem>
        </List>

        <List
          dataArray={data}
          renderRow={(item) =>
            <ListItem style={listItemStyles} onPress={()=>{
              this.props.navigation.push("MyWebView",
                {uri:'https://asahi.5ch.net/test/read.cgi/newsplus/'+item.tid+'/-100'})}}>
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
  }
}
////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)

////////////////////////////////////////////////////////////////////////////////
