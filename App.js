////////////////////////////////////////////////////////////////////////////////
//import 'react-native-gesture-handler'; // moved to index.js
import * as React from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './configureStore'
import { Alert } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeHeader from './src/components/MyHeader'
import NavDrawerScreens from './src/components/NavDrawerScreens'

////////////////////////////////////////////////////////////////////////////////

const Stack = createStackNavigator()

////////////////////////////////////////////////////////////////////////////////

export default class App extends React.Component {
  componentDidMount() {
    //Alert.alert('mount')
  }
  render() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="NavDrawerScreens"
              component={NavDrawerScreens}
              options={{
                header: () => <HomeHeader onPress={{}} />
              }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
  }
}
////////////////////////////////////////////////////////////////////////////////
