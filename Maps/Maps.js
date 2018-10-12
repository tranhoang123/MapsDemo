import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
export default class MapTest extends Component {
  static navigationOptions = {
    title: 'Bản đồ',
  };
  // const { params } = this.props.navigate.state;
  // var location = params.location;
  render () {
    const{params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: params.location.Kinhdo,
            longitude: params.location.Vido,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          //showUserLocation={true}
          showsCompass = {true}
        >
        <MapView.Marker coordinate={{
          latitude: params.location.Kinhdo,
          longitude: params.location.Vido,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}/>
        </MapView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
})
