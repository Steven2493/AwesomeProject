import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'
import { StackNavigator } from 'react-navigation';

import styles from './Style'
import MapView from 'react-native-maps';
import haversine from 'haversine'
import pick from 'lodash/pick'
const {width, height} = Dimensions.get('window')

const SCREEN_HEIGTH = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

export default class AwesomeProjectScreen extends Component {
  static navigationOptions = {
    title: 'PacMan',
  };
  constructor(props) {
       super(props)

       this.state = {
         routeCoordinates: [],
         distanceTravelled: 0,
         prevLatLng: {}
       }
     }

     componentDidMount() {
       navigator.geolocation.getCurrentPosition(
         (position) => {},
         (error) => alert(error.message),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
       )
       this.watchID = navigator.geolocation.watchPosition((position) => {
         const { routeCoordinates, distanceTravelled } = this.state
         const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
         const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
         this.setState({
           routeCoordinates: routeCoordinates.concat(positionLatLngs),
           distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
           prevLatLng: newLatLngs
         })
       });
     }

     componentWillUnmount() {
       navigator.geolocation.clearWatch(this.watchID);
     }

     calcDistance(newLatLng) {
       const { prevLatLng } = this.state
       return (haversine(prevLatLng, newLatLng) || 0)
     }

     render() {
       return (
         <View style={styles.container}>
           <MapView
             style={styles.map}
             showsUserLocation={true}
             followUserLocation={true}
             overlays={[{
               coordinates: this.state.routeCoordinates,
               strokeColor: '#f44242',
               lineWidth: 10,
             }]} />
           <View style={styles.titleBar}><Text style={styles.titleBarText}>PanMan</Text></View>
              <View style={styles.scoreBar}>
             <View style={styles.scoreBarGroup}>
               <Text style={styles.scoreBarHeader}>POINTS</Text>
               <Text style={styles.scoreBarContent}>{(parseFloat(this.state.distanceTravelled)*10).toFixed(2)}</Text>
             </View>
           </View>
         </View>
       )
     }
   }

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
