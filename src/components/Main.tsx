
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { NativeRouter, Route, Link,Redirect } from "react-router-native";
import { withRouter } from 'react-router';
import {RouteComponentProps} from "react-router";
import Home from './Home'
import Hot from './Hot'
import Category from './Category'
import Search from './Search'
import { Alert } from 'react-native';

class Main extends React.Component<RouteComponentProps<{}>> {

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
        <Route exact path="/" component={Home} />
        <Route exact path="/Hot" component={Hot} />
        <Route exact path="/Category" component={Category} />
        <Route exact path="/Search" component={Search} />
      </Content>

      <Footer>
          <FooterTab>
            <Button vertical onPress={()=>{this.props.history.push('/')}}>
              <Icon name="home" />
              <Text>ホーム</Text>
            </Button>
            <Button vertical onPress={()=>{this.props.history.push('/Hot')}}>
              <Icon name="thumbs-up" />
              <Text>人気</Text>
            </Button>
            <Button vertical onPress={()=>{<Redirect to="/Category" />}}>
              <Icon active name="apps" />
              <Text>カテゴリ</Text>
            </Button>
            <Button vertical onPress={()=>{<Redirect to="/Search" />}}>
              <Icon name="search" />
              <Text>検索</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

export default withRouter(Main)
