////////////////////////////////////////////////////////////////////////////////

import React  from 'react'
import { connect } from 'react-redux'
import * as appState from '../redux/AppState'
import * as apiState from '../redux/ApiState'
import { Container, Content, Text,List,ListItem,Left,Right,Button,Icon,Body } from 'native-base';
import { Alert, RefreshControl  } from "react-native";

////////////////////////////////////////////////////////////////////////////////

class PageButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {

    if (!this.props.recs_key) {
      return null
    }
    if (!this.props.url) {
      return null
    }
    //Alert.alert(this.props.recs_key)
    //Alert.alert(JSON.stringify(this.props.appState.recs[this.props.recs_key]))
    if (!this.props.appState.recs[this.props.recs_key] ||
        !this.props.appState.recs[this.props.recs_key].data.total_pages) {
          return null
    }
    var total_pages = this.props.appState.recs[this.props.recs_key].data.total_pages
    var page = this.props.appState.recs[this.props.recs_key].data.page
    var next_page = page+1
    var prev_page = page-1
    if (next_page > total_pages) {
      next_page = total_pages
    }
    if (prev_page < 1) {
      prev_page = 1
    }

    return (
  <>
  <Button onPress={()=>{
    this.props.api({ method: 'get',
    noLoading: true, // prevent from going back index 0 tab
    url: this.props.url + '?page=1'}, ()=> {
      this.props.listref.scrollTo({ y: 0, animated: true, })
     
    })
  }}><Text>TOP</Text></Button>
  <Button onPress={()=>{
    this.props.api({ method: 'get',
    noLoading: true,
    url: this.props.url + '?page='+prev_page}, ()=> {
      this.props.listref.scrollTo({ y: 0, animated: true, })

    })
  }}><Text>PREV</Text></Button>
  <Button onPress={()=>{
    this.props.api({ method: 'get',
    noLoading: true,
    url: this.props.url + '?page='+next_page}, ()=> {
      this.props.listref.scrollTo({ y: 0, animated: true, })

    })
  }}><Text>NEXT</Text></Button>
  <Button onPress={()=>{
    this.props.api({ method: 'get',
    noLoading: true,
    url: this.props.url + '?page='+total_pages}, ()=> {
      this.props.listref.scrollTo({ y: 0, animated: true, })
    })
  }}><Text>LAST</Text></Button>
  <Text>{page} / {total_pages}</Text>
  </>
    );
  }
};
  
////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = state => {
  return {
    apiState: state.apiState,
    appState: state.appState,
    uiState: state.uiState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    api: (params,success,error) =>
      dispatch(apiState.api(params,success,error)),
  }
}

////////////////////////////////////////////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(PageButtons)

////////////////////////////////////////////////////////////////////////////////
