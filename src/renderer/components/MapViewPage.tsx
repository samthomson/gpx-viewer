import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// @ts-ignore
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
// @ts-ignore
import * as L from 'leaflet'
import { Store } from '../redux/store'
import { GPXData } from '../../declarations';

import 'leaflet/dist/leaflet.css'


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface IMyComponentProps {
	fileData: GPXData
}

export class MapViewPage extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
		const position = [0, 0]


       return (
			<div>
				<h1>Map view page</h1> 

				<div style={{
					paddingBottom: "5%",
					height: "400px",
					width: "800px"
				}}>
					<Map style={{
						paddingBottom: "5%",
						height: "400px",
						width: "800px"}}
						center={position} zoom={3} id="map"
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						{this.props.fileData.points.map(function(point, i){
							return <Marker key={i} position={[point.latitude, point.longitude]}></Marker>
						})}
					</Map>
				</div>

				<p>[map view: render this gpx file - {this.props.fileData.points.length} points of data]</p>
				<p>[elevation profile]</p>
				<p>[trackpoint log]</p>
				<Link to="/">home</Link>
			</div> 
       )
    }
}

const mapStateToProps = (state: Store.App) => {
	return {
		fileData: state.fileData
	};
};

export default connect(
	mapStateToProps,
	null
)(MapViewPage)