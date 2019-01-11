import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// @ts-ignore
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
// @ts-ignore
import * as L from 'leaflet'
import { Store } from '../redux/store'
import { goToStartPage } from '../redux/actions'
import { GPXData } from '../../declarations';

import 'leaflet/dist/leaflet.css'


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface IMyComponentProps {
	goToStartPage: any,
	fileData: GPXData
}

export class MapViewPage extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
		const { latitude, longitude } = this.props.fileData.points[0]
		const position = [latitude, longitude]


		// create points
		let points: Array<[number, number]> = []

		this.props.fileData.points.map(oPoint => {
			points.push([oPoint.latitude, oPoint.longitude]);
		})
		let bounds = points

       return (
			<div className="map-container">
				<Map
					style={{
						height: "100%",
						width: "100%"
					}}
					bounds={bounds}
				>
					<TileLayer
						attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{points.map(function(point, i){
						return <Marker key={i} position={[point[0], point[1]]}></Marker>
					})}
				</Map>
			</div>
       )
    }
}

const mapStateToProps = (state: Store.App) => {
	return {
		fileData: state.fileData
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	goToStartPage: () => dispatch(goToStartPage())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapViewPage)