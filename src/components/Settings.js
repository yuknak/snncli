
import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'
import { Formik } from 'formik'

import { Container, Content, Button, Left, Right, Body, Text,Icon,List,ListItem,Switch,Grid,Col,Card } from 'native-base'
import { Alert } from 'react-native';

////////////////////////////////////////////////////////////////////////////////

class SettingsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: null
    }
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.setNavigation(this.props.navigation,this.props.route.name)
      //Alert.alert('',JSON.stringify(this.props.uiState.settings))
      // deep copy
      this.setState({settings: JSON.parse(JSON.stringify(this.props.uiState.settings))})
    });
    this._unsubscribe2 = this.props.navigation.addListener('blur', () => {
      //deep copy
      this.props.updateSettings(JSON.parse(JSON.stringify(this.state.settings)))
    });
  }
  componentWillUnmount() {
    this._unsubscribe()
    this._unsubscribe2()
  }
  render() {
    var itemList = []
    if (!this.state.settings||!this.state.settings.boards) {
      return null
    }
    this.state.settings.boards.forEach((item)=> {
      itemList.push(
        <ListItem icon key={item.name}>
        <Left></Left>
        <Body>
          <Text>{item.title_cached}</Text>
        </Body>
        <Right>
          <Switch value={item.enable} onValueChange={
            (value) => {
              var prev_value = item.enable
              item.enable = value
              var cnt = 0
              this.state.settings.boards.forEach((item)=> {
                if (item.enable) {
                  ++cnt
                }
              })
              if (cnt < 3) {
                Alert.alert('', '最低3つONにしてください')
                item.enable = prev_value
                if (cnt <= 1) {
                  //this.state.settings.boards[0].enable = true
                  //this.state.settings.boards[1].enable = true
                  //this.state.settings.boards[2].enable = true
                }
              }
              //deep copy
              this.setState({settings: JSON.parse(JSON.stringify(this.state.settings))})
            }}/>
        </Right>
        </ListItem>
      )
    })
    return (
      <Container>
        <Content>
          <Card>
            <List>
            <ListItem itemDivider><Text>カテゴリ表示する掲示板(最低3つ)</Text></ListItem>
              {itemList}
            <ListItem itemDivider/>
            </List>
            </Card>
          </Content>
      </Container>
    )
  }
}
////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
  return {
    uiState: state.uiState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNavigation: (navigation,routeName) =>
      dispatch(uiState.setNavigation(navigation,routeName)),
    updateSettings: (settings) =>
      dispatch(uiState.updateSettings(settings)),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)

////////////////////////////////////////////////////////////////////////////////