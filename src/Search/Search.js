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
        const addresses = []
        const buildings = []
        this.setState({ buildingList: buildings })
        this.setState({ addressList: addresses })
        this.setState({ navLink: null })
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
    centerBuilding = async (lat, lng) => {
        this.props.buildingHandler(lat, lng)
        this.setState({ navLink: 'https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng })
    }

    render() {

        let buildings = this.state.buildingList[0]
        let addresses = this.state.addressList
        console.log(this.props.addresses)
        console.log(this.props.buildings)

        return (
            <div className="Search">
                <h3>
                    Search for an appartment to get directions to exact building locations:
                </h3>
                <form>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    {this.state.value && <h2
                        onClick={() => this.centerAddress(addresses[0])}>{addresses[0]}
                    </h2>}

                    {this.state.buildingList[0] && this.state.value &&
                        <ul className="Suit_Results">
                            {buildings.map(building => <li key={building[0]} onClick={() => this.centerBuilding(building[1], building[2])}>{building[0]}</li>)}
                        </ul>}

                    {this.state.navLink && <div className="Nav_Link">
                        <a href={this.state.navLink} target="_blank" rel="noopener noreferrer"><img src="./res/nav.png" alt="Directions" height={50} width={50} /></a>
                    </div>}

                </form>

            </div>
        );
    }
}

export default Search