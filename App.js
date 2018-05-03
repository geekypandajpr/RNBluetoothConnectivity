/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const deviceList = [];

type Props = {};
export default class App extends Component<Props> {

  constructor() {
      super();
      this.manager = new BleManager();
  }

  


  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            alert(error);
            // Handle error (scanning will be stopped automatically)
            return
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        console.log(device.name);
        console.log(device.id);

        if(device && device.name != null) {

          
        }


        if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
            
            // Stop scanning as it's not necessary if you are scanning for one device.
            this.manager.stopDeviceScan();

            // Proceed with connection.


            device.connect().then((device) => {
              return device.discoverAllServicesAndCharacteristics()
            }).then((device) => {
            // Do work on device with services and characteristics
            }).catch((error) => {
              // Handle errors
            });
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
       <Text>Hello</Text>
      </View>
    );
  }


  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            this.scanAndConnect();
            subscription.remove();
        }
    }, true);
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
