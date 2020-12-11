//import 'react-native-gesture-handler'; // moved to index.js
import * as React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/components/Home'
import Hot from './src/components/Hot'
import Category from './src/components/Category'
import Search from './src/components/Search'
import Profile from './src/components/Profile'
import Settings from './src/components/Settings'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Teken from https://reactnavigation.org/docs/bottom-tab-navigator
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
      <Tab.Screen name="Hot" options={{title: "人気",icon:"thumbs-up"}} component={Hot} />
      <Tab.Screen name="Category" options={{title: "カテゴリ",icon:"apps"}} component={Category} />
      <Tab.Screen name="Search" options={{title: "検索",icon:"search"}} component={Search} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App