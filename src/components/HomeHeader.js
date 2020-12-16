
////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'
import { Header, Title, Button, Left, Right, Body, Icon,Subtitle,Text } from 'native-base'

////////////////////////////////////////////////////////////////////////////////

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Header>
        <Left>
          { /*
          <Button transparent onPress={()=>{this.props.onPress}}>
            <Icon name='menu' />
          </Button>
          */ }
        </Left>
        <Body>
          <Title>SUPERNN.NET</Title>
          <Subtitle>5ちゃんねるニュース</Subtitle>
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
    setNavigation: (navigation) =>
      dispatch(uiState.setNavigation(navigation)),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)

////////////////////////////////////////////////////////////////////////////////