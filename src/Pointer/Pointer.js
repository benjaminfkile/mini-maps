import React, {Component} from 'react'
import '../Pointer/Pointer.css'


class Pointer extends Component{

    render(){
        return(
            <div className="Pointer">
                 <img src="./res/pointer.png" alt="Pointer" height="42" width="42"></img>               
            </div>
        )
    }

}

export default Pointer