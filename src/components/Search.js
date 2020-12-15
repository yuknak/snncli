
import React, { Component } from 'react';
import { Container, Item, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import HomeHeader from './HomeHeader'
import FlatListDropDown from './FlatListDropDown'


export default function Search({ navigation }) {
    return (

      <Container>


<Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <FlatListDropDown/>

      <Content>


          </Content>
      
</Container>

    );
  }