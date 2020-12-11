
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

export default function AppHeader({ navigation: { navigate } }) {
    return (
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>SUPERNN.NET</Title>
            <Subtitle>5ちゃんねるニュース</Subtitle>
          </Body>
          <Right />
        </Header>
    );
  }
