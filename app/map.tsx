import MapView from 'react-native-maps';
import React from 'react'
import { StyleSheet } from 'react-native';

const DoctorMap = () => {
  return (
    <MapView
    style={
            {...StyleSheet.absoluteFillObject}}
    
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>
  )
}

export default DoctorMap