
import React, { Component } from 'react';
import { Container, Content, Text,List,ListItem } from 'native-base';
import HomeHeader from './HomeHeader'

class Line extends Component {
  render() {
    return (
      <ListItem>
        <Text>Home</Text>
      </ListItem>
    )
  }

}
export default class Home extends Component {
  render() {
    return (
      <Container>
      <HomeHeader {...this.props} />
      <Content>
          <List>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
            <Line/>
          </List>
          </Content>
        </Container>
    )
  }
}