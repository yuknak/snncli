
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import AppHeader from './AppHeader'

export default function Hot({ navigation: { navigate } }) {
  return (

    <Container>
      <AppHeader navigation={{navigate}}/>

    <Content>

  <Text>test</Text>
  <Button
      onPress={() =>
        navigate('Search', { })
      }
      title="Go to Search"
    />
        </Content>


    
</Container>

  );
}
