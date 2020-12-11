
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import AppHeader from './AppHeader'

class Line extends Component {
  render() {
    return (

      <ListItem>
<Text>Search</Text>
    </ListItem>
    )
  }

}
export default function Search({ navigation: { navigate } }) {
    return (

      <Container>
        <AppHeader navigation={{navigate}}/>

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