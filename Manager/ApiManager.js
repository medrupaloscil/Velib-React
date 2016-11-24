import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import { createStore } from 'redux';

export default class ApiManager extends Component{

    baseUrl = "https://api.jcdecaux.com/vls/v1/";

    getParisContract(){
                d = this.baseUrl+"stations?contract=Paris";
                console.log('test');
                data = fetch(d)
                .then((response) => response.json())
                .then((responseJson) => {
                  console.warn(responseJson)
                    return responseJson
                })
    }

}
