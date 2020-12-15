import React, { Component } from 'react';
import { Card, Container, Item, Header, Title, Input, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { Alert, RefreshControl,View } from "react-native";

export default class Tab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    Alert.alert('test2')
  }
  componentWillUnmount(){
  }
  render() {
    return (
      <Card><Text>test</Text></Card>
    )
  }
}