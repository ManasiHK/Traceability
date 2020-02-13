import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {PermissionsAndroid} from 'react-native';
import FlashMessage from "react-native-flash-message";
import Main from "./src/router/index";

//type Props = {};
export default class App extends Component {

  async componentDidMount(){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,
          {
            title: 'Storage Permission',
            message:
              'Traceability needs access to your storage and camera' ,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
  }
  
  render() {
    return (
        <View style={{flex: 1}}>
           <StatusBar
                backgroundColor="#000034"
                barStyle="light-content"
            />
           <Main/>
           <FlashMessage position="top" />
        </View>
    );
  }
}

console.disableYellowBox = true;