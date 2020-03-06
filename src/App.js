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
      targetLat: null,
      targetLng: null,
      addresses: null,
      buildings: null
    }
  }


  getAddresses = () => {
    let targetUrl = 'http://localhost:8000/api/addresses';
    fetch(targetUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({addresses: data})
      })
      .catch(error => console.log('Sorry the service is down \n:(\nPlease try again later'));
  }

  getBuildings = () => {
    let targetUrl = 'http://localhost:8000/api/buildings';
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

    // this.setState({ navLink: 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng })
    this.state.currentMap.setCenter(new window.google.maps.LatLng(lat, lng));
  }

  componentDidMount() {
    this.getLocation()
    // this.getAddresses()
    // this.getBuildings()
  }

  getLocation = () => {
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
          addresses={this.state.addresses}
          buildings={this.state.buildings}
        />

        <div className="Map_Container">

          <Map
            id="Map"
            options={{
              center: { lat: parseFloat(this.state.targetLat), lng: parseFloat(this.state.targetLng) },
              zoom: 19,
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

        </div>
      </div>
    );
  }
}

export default App;