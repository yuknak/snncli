
import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon,Subtitle } from 'native-base';

export default class HomeHeader extends Component {
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
