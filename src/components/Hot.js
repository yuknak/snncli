
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import AppHeader from './AppHeader'

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
      <AppHeader navigation={navigation}/>

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
