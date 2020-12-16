
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Tab, Container, ScrollableTab } from 'native-base'
import CategoryTab from './CategoryTab'
import { Alert } from "react-native";
import * as uiState from '../redux/UiState'
import * as apiState from '../redux/ApiState'

var board_list = [
  {title: "ニュー速", key:"newsplus"},
  {title: "芸スポ", key:"mnewsplus"},
  {title: "東アジア", key:"news4plus"},
  {title: "ビジネス", key:"bizplus"},
  {title: "政治", key:"seijinewsplus"},
  {title: "国際", key:"news5plus"},
  {title: "科学", key:"scienceplus"},
  {title: "ローカル", key:"femnewsplus"},
  {title: "萌え", key:"moeplus"},
  {title: "アイドル", key:"idolplus"},
  {title: "痛い", key:"dqnplus"},
]

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  } 
  componentDidMount() {
    this.props.setNavigation(this.props.navigation,this.props.route.name)
  }
  render() {
    var tabList = []
    board_list.forEach((item)=> {
      tabList.push(
        <Tab key={item.key} heading={item.title}>
          <CategoryTab boardName={item.key} title={item.title} {...this.props}/>
        </Tab>
      )
    })
    return (
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          {tabList}
        </Tabs>
      </Container>
    );
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
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Category)

////////////////////////////////////////////////////////////////////////////////