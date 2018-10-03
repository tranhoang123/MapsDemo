/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  Platform,
  //StyleSheet,
  //Text,
  //View
} from 'react-native';

import {
  createStackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import PropertyView from './PropertyView';
import Maps from './Maps';
// import Maps from './Maps';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
// class SearchPage extends Component<Props> {
//   static navigationOptions = {
//       "title":"Property Finder",
//     };
//   render() {
//     return <Text style={styles.description}>Tìm Nhà để mua</Text>;
//   }
// }

const App = createStackNavigator({
  Home: { screen: SearchPage},
  Results: {screen: SearchResults},
  Details: {screen: PropertyView},
  Mapsview: {screen: Maps},
});
export default App;

// const styles = StyleSheet.create({
//   description: {
//     "fontSize": 18,
//     "textAlign":"center",
//     "color":"#656565",
//     "marginTop":65,
//   },
// });
