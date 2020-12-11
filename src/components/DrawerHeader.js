
import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon,Subtitle,Text } from 'native-base';

export default function DrawerHeader({navigation}){
    return (
        <Header>
          <Left>
            <Button transparent onPress={()=>{navigation.goBack()}}>
              <Icon name='chevron-back-outline' />
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
