/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGTH = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO


const mapCoords = {
snappedPoints: [
    {location:
      {
        latitude: 60.17087791867259,
        longitude: -24.94269982192242
    },
  },
      {location:
        {
          latitude: 60.170876898776406,
          longitude: 24.942699912064775
      },
    },
      {location:
        {
          latitude: 40.170874902634374,
          longitude: 24.942700088491474
      },
    },
  ]
}


export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      InitialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitude: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
      })
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID)
    }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          Region={this.state.initialPosition}>

          {mapCoords.snappedPoints.map((location, i )=> {
            return <MapView.Marker
              coordinate={location.location} key={i}
            />
          })}
          <MapView.Marker
            coordinate={this.state.markerPosition}
          />
          </MapView>
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
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
