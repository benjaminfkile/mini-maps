import React, { Component } from 'react'
import '../Search/Search.css'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            addressList: [],
            buildingList: [],
            navLink: null,
            waiting4DB: true,
            interval: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ interval: setInterval(this.listen4DB, 1000) })
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
        if (args && this.props) {
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




    listen4DB = () => {
        if (this.props.addresses) {
            this.setState({ waiting4DB: false })
            this.stopListening4DB()
        }
        console.log(this.state.waiting4DB)
    }

    stopListening4DB = () => {
        clearInterval(this.state.interval);
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
                {!this.state.waiting4DB &&
                    <h2>
                        Search for an address
                    </h2>}

                {!this.state.waiting4DB &&
                    <form>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        {addresses.length > 0 && this.state.value &&
                            <div className="Address_Results">
                                <h2
                                    onClick={() => this.centerAddress(addresses[0].initCoords)}>{addresses[0].address}
                                </h2>
                            </div>}

                        {this.state.buildingList && this.state.value &&
                            <ul className="Suit_Results">
                                {buildings.map(building => <li key={Math.random() * Math.random()} onClick={() => this.centerBuilding(building.coords)}>{building.number}</li>)}
                            </ul>}
                    </form>}

                {this.state.value === '' &&
                    <div className="Splash">
                        <h3>
                            Powered by Google Maps
                        </h3>
                        <h4>
                            and Pizza Guys
                        </h4>
                    </div>}

                {this.state.navLink &&
                    <div className="Nav_Link">
                        <a href={this.state.navLink} target="_blank" rel="noopener noreferrer"><img src="./res/nav.png" alt="Directions" height={"50vw"} width={"50vh"} />
                        </a>
                    </div>}

                {this.state.waiting4DB &&
                    <div className="Loading">
                        <h3>
                            Talking to server, please wait
                    </h3>
                    </div>}


            </div>
        );
    }
}

export default Search