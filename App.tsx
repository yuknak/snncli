
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { NativeRouter, Route, Link } from "react-router-native";

import Home from './src/components/Home'
import Hot from './src/components/Hot'
import Category from './src/components/Category'
import Search from './src/components/Search'

export default class App extends Component {
  render() {
    return (
      <Container>
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

      <Content>
      <NativeRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/Hot" component={Hot} />
        <Route exact path="/Category" component={Category} />
        <Route exact path="/Search" component={Search} />
      </NativeRouter>
      </Content>

      <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>ホーム</Text>
            </Button>
            <Button vertical>
              <Icon name="thumbs-up" />
              <Text>人気</Text>
            </Button>
            <Button vertical>
              <Icon active name="apps" />
              <Text>カテゴリ</Text>
            </Button>
            <Button vertical>
              <Icon name="search" />
              <Text>検索</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}