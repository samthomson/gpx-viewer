import * as React from 'react'
// import * as Redux from 'react-redux'
// import * as actions from 'actions'
import { Link } from 'react-router-dom'

export class MapViewPage extends React.Component {
    
    constructor () {
        super()
    }

    render() {
       return (
        <div>
            <h1>Map view page</h1>
            <p>[map view]</p>
            <p>[elevation profile]</p>
            <p>[trackpoint log]</p>
			<Link to="/">home</Link>
        </div> 
       )
    }
}

// export default Redux.connect()(MapViewPage)
export default MapViewPage