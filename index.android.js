/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import StationsList from './Scenes/StationsList';
import StationDetail from './Scenes/StationDetail';

const routes = [
    {title: 'Stations', index: 0},
    {title: 'Detail', index: 1},
];

export default class Velib extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{ title: 'Awesome Scene', index: 0 }}
          renderScene={(route, navigator) => {
              if (route.index == 1) {
                return (<StationDetail navigator={navigator} />);
              } else {
                return (<StationsList navigator={navigator} />);
              }
          }}
          style={{paddingTop: 30}}/>
    );
  }
}

AppRegistry.registerComponent('Velib', () => Velib);
