
import React, { Component } from 'react';
import { Tabs, Tab, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle,ScrollableTab } from 'native-base';
import HomeHeader from './HomeHeader'
import CategoryTab from './CategoryTab';
import { Alert, RefreshControl,View } from "react-native";

var board_list = [
  {title: "ニュー速", key:"newsplus"},
  {title: "芸スポ", key:"mnewsplus"},
  {title: "東アジア", key:"news4plus"},
  {title: "ビジネス", key:"bizplus"},
  {title: "政治", key:"seijinewsplus"},
  {title: "国際", key:"news5plus"},
  {title: "科学", key:"scienceplus"},
  {title: "ローカル", key:"femnewsplus"},
  {title: "萌え", key:"moeplus"},
  {title: "アイドル", key:"idolplus"},
  {title: "痛い", key:"dqnplus"},
]

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    var tabList = []
    board_list.forEach((item)=> {
      tabList.push(
        <Tab key={item.key} heading={item.title}>
          <CategoryTab boardName={item.key} title={item.title} {...this.props}/>
        </Tab>
      )
    })
    return (
      <Container>
        <Text>{JSON.stringify(this.props)}</Text>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {tabList}
        </Tabs>
      </Container>
    );
  }
  }