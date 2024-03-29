import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';
import React from 'react'

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