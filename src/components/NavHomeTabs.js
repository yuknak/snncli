import * as React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Button, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle } from 'native-base';
import { Alert,View, Icon as IconRN, Button as ButtonRN } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home'
import Settings from './Settings'
import Category from './Category'
import Search from './Search'
import About from './About'

import HomeHeader from './HomeHeader'

const Tab = createBottomTabNavigator();

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

export default function NavHomeTabs() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" options={{title: "ホーム",icon:"home"}} component={Home} />
      <Tab.Screen name="Category" options={{title: "カテゴリ",icon:"newspaper"}} component={Category} />
      <Tab.Screen name="Search" options={{title: "検索",icon:"search"}} component={Search} />
      <Tab.Screen name="Settings" options={{title: "設定",icon:"settings"}} component={Settings} />
    </Tab.Navigator>
  );
}
