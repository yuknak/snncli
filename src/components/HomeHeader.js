
import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Icon,Subtitle } from 'native-base';

export default function HomeHeader({navigation}){
    return (
        <Header>
          <Left>
            <Button transparent onPress={()=>{navigation.openDrawer()}}>
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
