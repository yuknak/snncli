
import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { NativeRouter, Route, Link,Redirect } from "react-router-native";

import Main from './src/components/Main'

import { Alert } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <NativeRouter>
        <Main/>
      </NativeRouter>
    );
  }
}

