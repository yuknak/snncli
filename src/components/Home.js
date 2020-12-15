
import React, { Component } from 'react';
import { Tabs, Tab, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle,ScrollableTab } from 'native-base';
import HomeHeader from './HomeHeader'
import HomeTab from './CategoryTab';
import { Alert, RefreshControl,View } from "react-native";

var board_list = [
  {title: "総合", key:"general"},
  {title: "最新", key:"latest"},
  {title: "ホット", key:"hot"},
]

export default class Home extends Component {
  render() {
    var tabList = []
    board_list.forEach((item)=> {
      tabList.push(
        <Tab key={item.key} heading={item.title}>
          <HomeTab boardName={item.key} title={item.title} {...this.props}/>
        </Tab>
      )
    })
    return (
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {tabList}
        </Tabs>
      </Container>
    );
  }
  }