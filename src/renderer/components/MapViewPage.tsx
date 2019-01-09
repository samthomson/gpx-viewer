import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Store } from '../redux/store'

interface IMyComponentProps {
	filePath: string
}

export class MapViewPage extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
       return (
        <div>
            <h1>Map view page</h1> 
            <p>[map view: render this gpx file - {this.props.filePath}]</p>
            <p>[elevation profile]</p>
            <p>[trackpoint log]</p>
			<Link to="/">home</Link>
        </div> 
       )
    }
}

const mapStateToProps = (state: Store.App) => {
	return {
		filePath: state.filePath
	};
};

export default connect(
	mapStateToProps,
	null
)(MapViewPage)