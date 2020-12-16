//import 'react-native-gesture-handler'; // moved to index.js
import * as React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Button, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { Alert,View, Icon as IconRN, Button as ButtonRN } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './Home'
import Settings from './Settings'
import Category from './Category'
import Search from './Search'
import About from './About'

import HomeHeader from './HomeHeader'

import NavHomeTabs from './NavHomeTabs'

const Drawer = createDrawerNavigator();

export default function NavDrawerScreens() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      <Drawer.Screen name="NavHomeTabs" options={{title: "5chニュース", drawerIcon: () => (<Icon name="home"/>)}} component={NavHomeTabs}/>
      <Drawer.Screen name="Settings" options={{title: "アプリ設定", drawerIcon: () => (<Icon name="settings"/>)}} component={Settings} />
      <Drawer.Screen name="About" options={{title: "このアプリについて", drawerIcon: () => (<Icon name="information-circle" />)}} component={About} />
    </Drawer.Navigator>
  );
}
