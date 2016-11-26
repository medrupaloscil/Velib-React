import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import { createStore } from 'redux';

ApiManager = {

  config: require('../config/api.json'),
  baseUrl: "https://api.jcdecaux.com/vls/v1/",

  getCityContract: function(city){
    d = this.baseUrl+"stations?contract=Paris&apiKey="+this.config.apiKey;
    //d = this.baseUrl+"stations?contract="+city+"&apiKey="+config.apiKey;

    return fetch(d)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    })
  },

  getStationDetail: function(stationId, city){
    //d = this.baseUrl+"stations/"+stationId+"?contract="+city+"&apiKey="+config.apiKey;
    d = this.baseUrl+"stations/31705?contract=Paris&apiKey="+this.config.apiKey;

    return fetch(d)
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
      console.error(error);
    })
  }
}

module.exports = ApiManager


// export default class ApiManager extends Component{
//
//     config = require('../config/api.json')
//     baseUrl = "https://api.jcdecaux.com/vls/v1/";
//
//     getCityContract(city){
//       d = this.baseUrl+"stations?contract=Paris&apiKey="+this.config.apiKey;
//       //d = this.baseUrl+"stations?contract="+city+"&apiKey="+config.apiKey;
//
//       data = fetch(d)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.warn(responseJson)
//         return responseJson;
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//     }
//
//     getStationDetail(stationId, city){
//       //d = this.baseUrl+"stations/"+stationId+"?contract="+city+"&apiKey="+config.apiKey;
//       d = this.baseUrl+"stations/31705?contract=Paris&apiKey="+this.config.apiKey;
//
//       data = fetch(d)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         console.warn(responseJson)
//           return responseJson;
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//     }
//
// }
