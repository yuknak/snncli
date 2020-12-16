
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'
import { Header, Title, Button, Left, Right, Body, Icon,Subtitle,Text } from 'native-base'

////////////////////////////////////////////////////////////////////////////////

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Header>
        <Left>
          {
          (<Button transparent onPress={()=>{this.props.uiState.navigation.openDrawer()}}>
          <Icon name='menu' />
        </Button>)}
        </Left>
        <Body>
          <Title>SUPERNN.NET</Title>
          <Subtitle><Text>{this.props.uiState.routeName}</Text></Subtitle>
        </Body>
        <Right />
      </Header>

    )
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

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader)

////////////////////////////////////////////////////////////////////////////////