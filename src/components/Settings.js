
import React, { Component } from 'react';
import { TabHeading, Tabs, Tab, Segment, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text,Icon,List,ListItem,Thumbnail,Subtitle,ScrollableTab } from 'native-base';

import HomeHeader from './HomeHeader'
import SettingsTab from './SettingsTab'

export default function Settings({ navigation }) {
  return (

    <Container>


<Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading={ <TabHeading><Icon name="settings" /></TabHeading>}>
            <SettingsTab />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="home" /></TabHeading>}>
            <SettingsTab />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="newspaper" /></TabHeading>}>
            <SettingsTab />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="search" /></TabHeading>}>
            <SettingsTab />
          </Tab>
        </Tabs>

    
</Container>

  );
}
