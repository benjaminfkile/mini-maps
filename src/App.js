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
      targetLng: null

    }
  }

  addressHandler = (lat, lng) => {

    this.setState({ targetLat: lat })
    this.setState({ targetLng: lng })
  }


  buildingHandler = (lat, lng) => {

    this.setState({ buildingLat: lat })
    this.setState({ buildingLng: lng })
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
    this.setState({ centerLat: position.coords.latitude })
    this.setState({ centerLng: position.coords.longitude })
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

        {this.state.targetLat && this.state.buildingLat && <Map
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

              const marker = new window.google.maps.Marker(
                {
                  position: { lat: parseFloat(this.state.buildingLat), lng: parseFloat(this.state.buildingLng) },
                  map: map,
                  label: '',
                  // icon: mapIcon
                });
            }}
          />}
        {this.state.targetLat && <Map
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

              const marker = new window.google.maps.Marker(
                {
                  position: { lat: parseFloat(this.state.buildingLat), lng: parseFloat(this.state.buildingLng) },
                  map: map,
                  label: '',
                  // icon: mapIcon
                });
            }}
          />}

          {!this.state.targetLat && <Map
            id="Map"
            options={{
              center: { lat: parseFloat(this.state.centerLat), lng: parseFloat(this.state.centerLng) },
              zoom: 19,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              mapTypeId: 'satellite',
              tilt: 0,
              rotateControl: true,
            }}
            onMapLoad={map => {

              const marker = new window.google.maps.Marker(
                {
                  position: { lat: parseFloat(this.state.buildingLat), lng: parseFloat(this.state.buildingLng) },
                  map: map,
                  label: '',
                  // icon: mapIcon
                });
            }}
          />}
        </div>
      </div>
    );
  }
}

export default App;