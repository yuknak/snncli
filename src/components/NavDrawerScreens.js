////////////////////////////////////////////////////////////////////////////////

import * as React from 'react'
import { Icon } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'

import NavHomeTabs from './NavHomeTabs'
import Settings from './Settings'
import About from './About'

////////////////////////////////////////////////////////////////////////////////

const Drawer = createDrawerNavigator()

export default function NavDrawerScreens() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      <Drawer.Screen name="NavHomeTabs" options={{title: "5chニュース", drawerIcon: () => (<Icon name="home"/>)}} component={NavHomeTabs}/>
      <Drawer.Screen name="Settings" options={{title: "アプリ設定", drawerIcon: () => (<Icon name="settings"/>)}} component={Settings} />
      <Drawer.Screen name="About" options={{title: "このアプリについて", drawerIcon: () => (<Icon name="information-circle" />)}} component={About} />
    </Drawer.Navigator>
  )
}

////////////////////////////////////////////////////////////////////////////////
