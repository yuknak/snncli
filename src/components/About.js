
import React, { Component } from 'react';
import { Container, Content, Body, Text,Card,CardItem,Button,Icon,Grid,Col,Right } from 'native-base';

import DrawerHeader from './DrawerHeader'

export default function About({ navigation }) {
  return (
    <Container>
      <DrawerHeader navigation={navigation}/>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>SUPERNN.NET 5ちゃんねるニュース速報</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
              このサイトは5ちゃんねる(旧2ちゃんねる)のニュース速報＋系掲示板の書き込みを自動解析し、人気の高いニュース及び最新のニュースをリアルタイムで提供しています。
              </Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
              Made by Tetraserve, Co.,Ltd.
              </Text>
            </Body>
          </CardItem>

        </Card>
      </Content>
    </Container>
    );ß
  }