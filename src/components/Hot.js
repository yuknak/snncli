
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import HomeHeader from './HomeHeader'

class Line extends Component {
  render() {
    return (

      <ListItem>
<Text>Hot</Text>
    </ListItem>
    )
  }

}
export default function Hot({ navigation }) {
  return (

    <Container>
      <HomeHeader navigation={navigation}/>

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

  );
}
