//import 'react-native-gesture-handler'; // moved to index.js
import * as React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Button, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { Alert,View, Icon as IconRN, Button as ButtonRN } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './configureStore'

import Home from './src/components/Home'
import Settings from './src/components/Settings'
import Category from './src/components/Category'
import Search from './src/components/Search'
import About from './src/components/About'

import HomeHeader from './src/components/HomeHeader'

const MTab = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Custom tabBar made with NativeBase by yn
// Base code has been taken from
/// https://reactnavigation.org/docs/bottom-tab-navigator
function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Footer>
    <FooterTab>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        /*
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        */

        return (
          <Button key={index} vertical onPress={onPress} active={isFocused}>
            <Icon name={options.icon} />
            <Text>{label}</Text>
          </Button>
        )
      })}
    </FooterTab>
    </Footer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" options={{title: "ホーム",icon:"home"}} component={Home} />
      <Tab.Screen name="Category" options={{title: "カテゴリ",icon:"newspaper"}} component={Category} />
      <Tab.Screen name="Search" options={{title: "検索",icon:"search"}} component={Search} />
      <Tab.Screen name="Settings" options={{title: "設定",icon:"settings"}} component={Settings} />
    </Tab.Navigator>
  );
}

function DrawerScreens() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      <Drawer.Screen name="HomeTabs" options={{title: "5chニュース", drawerIcon: () => (<Icon name="home"/>)}} component={HomeTabs}/>
      <Drawer.Screen name="Settings" options={{title: "アプリ設定", drawerIcon: () => (<Icon name="settings"/>)}} component={Settings} />
      <Drawer.Screen name="About" options={{title: "このアプリについて", drawerIcon: () => (<Icon name="information-circle" />)}} component={About} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="DrawerScreens" component={DrawerScreens} options={{
              header: () => <HomeHeader onPress={{}} /> }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

