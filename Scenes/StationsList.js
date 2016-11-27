import React, { Component } from 'react';
import {
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Platform
} from 'react-native';

import MapView from 'react-native-maps';

import { createStore } from 'redux'

import ApiManager from '../Manager/ApiManager'

const width = Dimensions.get('window').width;

export default class StationsList extends Component {
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
            markers: []
        }
    }

    render() {
        return (
         <View style={styles.container}>
           <MapView
            //annotations={this.state.markers}
            customMapStyle={styles.map}
            showsUserLocation={true} /*Platform.select({ ios:{ followUserLocation={true} }, android: { showsMyLocationButton={true} } })*/ >

            {this.state.markers.map(marker => (
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                description={marker.subtitle}
              />
            ))}

            </MapView>
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
         </View>
        );
    }

    componentWillMount(){
      ApiManager.getCityContract("Paris")
      .then(responseJson => {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(responseJson)})
        this.setState({
          markers: createMarkers(responseJson)
        })
      })
    }

    componentDidMount(){}

    renderRow(data){
      return (
          <View style={styles.station_row}>
            <Text style={styles.station_name}>{data.name}</Text>
            <Text style={styles.station_count}>{data.available_bikes}/{data.bike_stands}</Text>
          </View>
      )
    }
}

function createMarkers(data) {
  var markers = [];
  for (var i = data.length - 1; i >= 0; i--) {
    var datum = data[i];
    var marker = {
      coordinates: {
        latitude: datum.position.lat,
        longitude: datum.position.lng
      },
      title: datum.name,
      subtitle: datum.available_bikes + " vélos restant, " + datum.available_bike_stands + " places libres",
      image: require('../img/velo2.png'),
    };
    markers.push(marker);
  };
  return markers;
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
  },
  station_row: {
    width: width,
    backgroundColor: "#FFF",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10
  },
  station_name: {
    flex: 0.8
  },
  station_count: {
    fontWeight: "bold",
    flex: 0.2,
    textAlign: "right"
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
