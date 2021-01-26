import React, { Component } from 'react';
import '../Map/Map.css'

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    let map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
      this.props.onMapLoad(map)      
  }

  componentDidMount() { 
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      // s.src = `https://maps.google.com/maps/api/js`;
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDCWWJLRXoNkdEhcpgJbmnkoWI-8tOgl10`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div className="Map"  id={this.props.id} />

    );
  }
}

export default Map