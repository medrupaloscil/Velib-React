import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  MapView
} from 'react-native';

import { createStore } from 'redux'

import ApiManager from '../Manager/ApiManager'

const width = Dimensions.get('window').width;

export default class StationsList extends Component {

    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(['test', 'toto', 'tutu'])
        }
    }

    render() {
        return (
         <View style={styles.container}>
           <MapView style={styles.map} showsUserLocation={true} followUserLocation={true}/>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
         </View>
        );
    }

    componentWillMount(){}

    componentDidMount(){

      ApiManager.getCityContract("Paris")
      .then(responseJson => {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson)})
      })
    }

    renderRow(data){
      return (
          <View>
            <Text>{data.number}</Text>
            <Text>{data.name}</Text>
          </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  map: {
    height: 200, 
    width: width,
    backgroundColor:"#000"
  }
});

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <Text style={{color: 'white', margin: 10, fontSize: 16}}>
        OhMyGodThisIsMoving
      </Text>
    );
  }
}

AppRegistry.registerComponent('StationsList', () => StationsList);