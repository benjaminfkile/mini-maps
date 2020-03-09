import React, { Component } from 'react'
import Map from './Map/Map'
import Search from './Search/Search'
import './dummy-store'
import './App.css'
import dummyStore from './dummy-store';
import Pointer from './Pointer/Pointer'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      targetLat: 46.8721,
      targetLng: -113.9940,
      addresses: null,
      buildings: null,
      location: false
    }
  }


  getAddresses = () => {
    let targetUrl = 'https://glacial-mesa-10951.herokuapp.com/api/addresses';
    fetch(targetUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({addresses: data})
      })
      .catch(error => console.log('Sorry the service is down \n:(\nPlease try again later'));
  }

  getBuildings = () => {
    let targetUrl = 'https://glacial-mesa-10951.herokuapp.com/api/buildings';
    fetch(targetUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({buildings: data})
      })
      .catch(error => console.log('Sorry the service is down \n:(\nPlease try again later'));
  }

  addressHandler = (lat, lng) => {
    this.state.currentMap.setCenter(new window.google.maps.LatLng(lat, lng));
  }

  buildingHandler = async (lat, lng, suit) => {
    this.state.currentMap.setCenter(new window.google.maps.LatLng(lat, lng));
  }

  componentDidMount() {
    this.getLocation()
    this.getAddresses()
    this.getBuildings()
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      this.setState({location: true})
    } else {
      this.setState({location: false})
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
          addresses={this.state.addresses}
          buildings={this.state.buildings}
        />

        {this.state.location && <div className="Map_Container">

          <Map
            id="Map"
            options={{
              center: { lat: parseFloat(this.state.targetLat), lng: parseFloat(this.state.targetLng) },
              zoom: 17.5,
              gestureHandling: 'none',
              zoomControl: false,
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              mapTypeId: 'satellite',
              tilt: 0,
              rotateControl: true,
            }}
            onMapLoad={map => {

              this.setState({ currentMap: map })

            }}
          />

          <Pointer />

        </div>}
      </div>
    );
  }
}

export default App;