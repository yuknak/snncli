
////////////////////////////////////////////////////////////////////////////////

import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text,List,ListItem,Left,Right,Button,Icon,Body } from 'native-base';
import { Alert, RefreshControl  } from "react-native";
import * as apiState from '../redux/ApiState'
import { formatDatetime,listCategoryStyles,replaceTitle, brandColors, formatEpoch, listItemStyles, listHeaderStyles } from '../lib/Common';

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
	'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

////////////////////////////////////////////////////////////////////////////////

class CategoryTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }
  componentDidMount() {
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
    var board = null
    if (this.props.appState.recs['get:/thread/'+this.props.boardName]) {
      data = this.props.appState.recs['get:/thread/'+this.props.boardName].data.data
      board = this.props.appState.recs['get:/thread/'+this.props.boardName].data.board
    }
    if (!data || !board) {
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
              params: {limit: 50, page: 1},
              noLoading: true
            }, ()=>{ 
              this.setState({refreshing: false})
            })
          }} />
        }
      >
        <List>
        <ListItem icon>
        <Left>
          <Button style={listHeaderStyles(this.props.boardName)}>
            <Icon name="newspaper" />
          </Button>
        </Left>
        <Body>
          <Text>{this.props.title}</Text>
        </Body>
        <Right>
          <Text style={{fontSize: 12}}>更新:{formatDatetime(board.mirrored_at)} 時速:{board.res_speed}res/h</Text>
        </Right>
        </ListItem>
        </List>

        <List
          dataArray={data}
          renderRow={(item) =>
            <ListItem style={listItemStyles} onPress={()=>{
              this.props.navigation.push("MyWebView",
                {uri:'https://'+this.props.serverName+
                  '/test/read.cgi/'+this.props.boardName+'/'+item.tid+'/-100'})}}>
              <Text>
                <Text style={listCategoryStyles(this.props.boardName)}>★</Text>
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
