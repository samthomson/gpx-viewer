import * as React from 'react'
// import * as Redux from 'react-redux'
// import * as actions from 'actions'
import { Link } from 'react-router-dom'

export class StartPage extends React.Component {
    
    constructor () {
        super()
    }

    render() {
       return (
        <div>
            <h1>Start page</h1>
            <p>Load a file to begin..</p>
			<Link to="/mapview">map</Link>
        </div> 
       )
    }
}

// export default Redux.connect()(StartPage)
export default StartPage
