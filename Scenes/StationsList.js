import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import { createStore } from 'redux'

import ApiManager from '../Manager/ApiManager'

export default class StationsList extends Component {

    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        manager = new ApiManager()
        data = manager.getParisContract()
        this.state = {
            dataSource: ds.cloneWithRows(['test', 'toto', 'tutu'])
        }
    }

    render() {
        return (
         <View style={styles.container}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text>{rowData}</Text>}
            />
         </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('StationsList', () => StationsList);
