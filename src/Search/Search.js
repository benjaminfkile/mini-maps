import React, { Component } from 'react'
import '../Search/Search.css'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            addressList: [],
            buildingList: [[]],
            navLink: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        this.addressFilter(this.state.value)
    }
    addressFilter = (args) => {
        let addresses = []
        let buildings = []
        this.setState({ buildingList: buildings })
        this.setState({ addressList: addresses })
        this.setState({ navLink: null })
        if (args) {
            for (let i = 0; i < this.props.addresses.length; i++) {
                if (args.substring(0, args.length).toUpperCase() === this.props.addresses[i].address.substring(0, args.length).toUpperCase()) {
                    addresses.push(this.props.addresses[i])
                    for (let j = 0; j < this.props.buildings.length; j++) {
                        if (this.props.buildings[j].addressId === this.props.addresses[i].id) {
                            buildings.push(this.props.buildings[j])
                        }
                    }
                }
            }
        }
        this.setState({ buildingList: buildings })
        this.setState({ addressList: addresses })
    }

    centerAddress = (addressCoords) => {
        let coords = addressCoords.split(',')
        this.props.addressHandler(coords[0], coords[1])
    }
    centerBuilding = async (buildingCoords) => {
        let coords = buildingCoords.split(',')
        this.props.buildingHandler(coords[0], coords[1])
        this.setState({ navLink: 'https://www.google.com/maps/search/?api=1&query=' + coords[0] + ',' + coords[1] })
    }

    render() {

        let buildings = this.state.buildingList
        let addresses = this.state.addressList

        return (
            <div className="Search">
                <h2>
                    Search for an address
                </h2>
                <form>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    {addresses.length > 0 && this.state.value && <div className="Address_Results">
                        <h2
                            onClick={() => this.centerAddress(addresses[0].initCoords)}>{addresses[0].address}
                        </h2>
                    </div>}


                    {this.state.buildingList && this.state.value &&
                        <ul className="Suit_Results">
                            {buildings.map(building => <li key={building[0]} onClick={() => this.centerBuilding(building.coords)}>{building.number}</li>)}
                        </ul>}
                </form>

                {this.state.navLink && <div className="Nav_Link">
                    <a href={this.state.navLink} target="_blank" rel="noopener noreferrer"><img src="./res/nav.png" alt="Directions" height={50} width={50} /></a>
                </div>}

            </div>
        );
    }
}

export default Search