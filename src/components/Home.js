
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Content, Text,List,ListItem } from 'native-base';
import HomeHeader from './HomeHeader'
import { Alert, RefreshControl,View } from "react-native";

////////////////////////////////////////////////////////////////////////////////

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }
  componentDidMount() {
    //Alert.alert('test')
  }
  componentWillUnmount(){
  }
  render() {
    const items=['test1','test2','test3','test4']
    return (
      <Container>
      <HomeHeader {...this.props} />
        <View>
          <List
            refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={()=>{
                this.setState({refreshing: true})}
            } /> }
            dataArray={items}
            renderRow={(item) =>
              <ListItem>
                <Text>{item}</Text>
              </ListItem>
            }
            keyExtractor={(item, index) => item.toString()}
            />
          </View>
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
    selectMarket: (market) =>
      dispatch(uiState.selectMarket(market)),
    selectOrder: (market, order) =>
      dispatch(uiState.selectOrder(market, order)),
    showAlert: (variant, message) =>
      dispatch(uiState.showAlert(variant, message)),
  }
}
////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Home)

////////////////////////////////////////////////////////////////////////////////
