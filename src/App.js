import React, { Component } from 'react'
import Map from './Map/Map'
import Search from './Search/Search'
import './dummy-store'
import './App.css'
import dummyStore from './dummy-store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      centerLat: null,
      centerLng: null,
      buildingLat: null,
      buildingLng: null,
      targetLat: null,
      targetLng: null,
      markers: []

    }
  }

  addressHandler = (lat, lng) => {
    this.state.currentMap.setCenter(new window.google.maps.LatLng(lat, lng));

  }


  buildingHandler = async (lat, lng, suit) => {
    console.log(suit)
    this.state.currentMap.setCenter(new window.google.maps.LatLng(lat, lng));

    new window.google.maps.Marker(
      {
        position: { lat:parseFloat(lat), lng:parseFloat(lng) },
        map: this.state.currentMap,
        label: '4E',
        // icon: mapIcon
      });

      // markers = this.state.markers
      // markers.push(markers)
      // this.setState({markers: markers})

      


  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert('oops')
    }
  }


  showPosition = (position) => {
    this.setState({ targetLat: position.coords.latitude })
    this.setState({ targetLng: position.coords.longitude })
  }

  render() {

    return (

      <div className="App_Container">

        <Search
          store={dummyStore}
          addressHandler={this.addressHandler}
          buildingHandler={this.buildingHandler}
        />

        <div className="Map_Container">

        <Map
            id="Map"
            options={{
              center: { lat: parseFloat(this.state.targetLat), lng: parseFloat(this.state.targetLng) },
              zoom: 19,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              mapTypeId: 'satellite',
              tilt: 0,
              rotateControl: true,
            }}
            onMapLoad={map => {

              this.setState({currentMap: map})

            }}
          />}

        </div>
      </div>
    );
  }
}

export default App;