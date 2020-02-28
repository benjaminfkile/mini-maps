import React, { Component } from 'react'
import '../Search/Search.css'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            addressList: [],
            buildingList: [[]],
            targetLat: '',
            targetLng: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        this.addressFilter(this.state.value)
    }

    addressFilter = (args) => {
        const addresses = []
        const buildings = []
        this.setState({ buildingList: buildings })
        this.setState({ addressList: addresses })
        if (args) {
            for (let i = 0; i < this.props.store.locations.length; i++) {
                if (args.substring(0, args.length) === this.props.store.locations[i].address.substring(0, args.length)) {
                    addresses.push(this.props.store.locations[i].address)
                    buildings.push(this.props.store.locations[i].buildings)

                }
            }
        }
        this.setState({ buildingList: buildings })
        this.setState({ addressList: addresses })

    }

    centerAddress = (args) => {
        for (let i = 0; i < this.props.store.locations.length; i++) {
            if (args === this.props.store.locations[i].address) {
                this.props.addressHandler(this.props.store.locations[i].initCoords[0], this.props.store.locations[i].initCoords[1])
            }
        }
    }
    centerBuilding = (lat, lng) => {
        this.props.buildingHandler(lat, lng)

    }


    render() {

        let buildings = this.state.buildingList[0]
        let addresses = this.state.addressList


        return (
            <div className="Search">
                <form>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <ul className="Address_Results">
                        {addresses.map(address => <li key={address} onClick={() => this.centerAddress(address)}>{address}</li>)}
                    </ul>
                    {this.state.buildingList[0] &&
                        <ul className="Suit_Results">
                            {buildings.map(building => <li key={building[0]} onClick={() => this.centerBuilding(building[1], building[2])}>{building[0]}</li>)}
                        </ul>}

                </form>
            </div>
        );
    }
}

export default Search