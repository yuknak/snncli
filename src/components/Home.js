
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';


import AppHeader from './AppHeader'
import { Alert } from 'react-native';

class Line extends Component {
  render() {
    return (

      <ListItem>
<Text>Home</Text>
    </ListItem>
    )
  }

}
export default function Home({ navigation: { navigate } }) {

    return (
      <Container>
        <AppHeader navigation={{navigate}}/>

      <Content>
        <Text>Home!</Text>

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