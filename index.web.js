/**
 * @format
 */

//import 'react-native-gesture-handler';// need to be placed on top.see intro docs.
import {AppRegistry} from 'react-native';
import App from './AppWeb'; // forweb
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// for web
AppRegistry.runApplication(appName, { rootTag: document.getElementById('root') });
