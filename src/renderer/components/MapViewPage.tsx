import * as React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
// @ts-ignore
import * as L from 'leaflet'
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster'

import { Store } from '../redux/store'
import { goToStartPage } from '../redux/actions'
import { GPXData } from '../../declarations';

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/dist/styles.min.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface IMyComponentProps {
	goToStartPage: any,
	fileData: GPXData,
	name: string,
	points: Array<[number, number]>
}

export class MapViewPage extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
		if (this.props.points.length > 0) {
			const { name, points } = this.props
			
			return (
				<div className="map-container">
					<div className="floating-map-button">
						<a className="ui button basic" onClick={this.props.goToStartPage}>close {name}</a>
					</div>
					<Map
						style={{
							height: "100%",
							width: "100%"
						}}
						bounds={points}
						maxZoom={18}
					>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<MarkerClusterGroup>
							{points.map(function(point, i){
								return <Marker key={i} position={[point[0], point[1]]}></Marker>
							})}
						</MarkerClusterGroup>
					</Map>
				</div>
			)
		} else {
			return (
				<div>loading..</div>
			)
		}
    }
}

const pointsFromFileData = (data: GPXData) => {
	let points: Array<[number, number]> = []

	if (data) {
		if (data.points) {
			data.points.map(oPoint => {
				points.push([oPoint.latitude, oPoint.longitude]);
			})
		}
	}
	return points
}

const nameFromFileData = (data: GPXData) => {
	return data && data.name ? data.name : '[error opening map]'
}

const mapStateToProps = (state: Store.App) => {
	return {
		fileData: state.fileData,
		points: pointsFromFileData(state.fileData),
		name: nameFromFileData(state.fileData)
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	goToStartPage: () => dispatch(goToStartPage())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapViewPage)