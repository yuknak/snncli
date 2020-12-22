
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text,List,ListItem,Left,Right,Button,Icon,Body } from 'native-base';
import { Alert, RefreshControl,View } from "react-native";
import * as apiState from '../redux/ApiState'
import { listCategoryStyles, replaceTitle, brandColors, formatEpoch, listItemStyles, listHeaderStyles } from '../lib/Common';

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
    //this.setState({refreshing: true})
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
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.appState.recs['get:/thread/'+this.props.boardName] ||
        !this.props.appState.recs['get:/thread/'+this.props.boardName].data) {
      return true
    }
    var d1 = this.props.appState.recs['get:/thread/'+this.props.boardName].data.data
    var d2 = nextProps.appState.recs['get:/thread/'+this.props.boardName].data.data
    if (!d1||!d2) {
      return false
    }
    if (JSON.stringify(d1)==JSON.stringify(d2)) {
      return false
    }
    return true
  }
  render() {
    var data = null
    if (this.props.appState.recs['get:/thread/'+this.props.boardName]) {
      data = this.props.appState.recs['get:/thread/'+this.props.boardName].data.data
    }
    if (!data) {
      return null
    }
    var params = {}
    params = {per_page: 50}
    return (
      <Container>
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>{             
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
            <ListItem key={item.tid} style={listItemStyles} onPress={()=>{
              this.props.navigation.push("MyWebView",
                {uri:'https://'+item.board.server.name+'/test/read.cgi/'+item.board.name+'/'+item.tid+'/-100'})}}>
              <Text>
                <Text style={listCategoryStyles(item.board.name)}>★</Text>
                <Text>{formatEpoch(item.tid)}&nbsp;</Text>
                <Text style={{color: brandColors.brandSuccess}}>{item.res_cnt}res&nbsp;</Text>
                <Text style={{color: brandColors.brandDanger}}>{item.res_speed}res/h&nbsp;</Text>
                <Text style={{color: brandColors.brandInfo}}>{Math.round(parseFloat(item.res_percent*10000))/100}%&nbsp;</Text>
                <Text>{replaceTitle(item.title)}</Text>
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
