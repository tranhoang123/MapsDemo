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
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.props.navigation.state.params.location.Kinhdo,
            longitude: this.props.navigation.state.params.location.Vido,
            latitudeDelta: 1.2,
            longitudeDelta: 1.2,
          }}
        ></MapView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
})
