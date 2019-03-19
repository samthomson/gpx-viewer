import * as React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
// @ts-ignore
import * as L from 'leaflet'
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster'


import ElevationProfile from './ElevationProfile';
import TimelineSidebar from './TimelineSidebar';

import { Store } from '../redux/store'
import { goToStartPage, updatePointsInView } from '../redux/actions'
import { GPXData, GPXPoint } from '../../declarations';

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
	filepoints: GPXPoint[],
	name: string,
	rawPoints: [number, number][]
	points: GPXPoint[],
	updatePointsInView: any
}

export class MapViewPage extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
	handleMoveend() {
		// fires on pan and zoom
		
		// @ts-ignore
		let oBounds = this.refs.map.leafletElement.getBounds()

		let aPointsWithinMapBounds: Array<any> = []

		var t0 = performance.now();

		this.props.points.forEach(oP => {
			if (oBounds.contains([oP.latitude, oP.longitude])) {
				aPointsWithinMapBounds.push(oP)
			}
		})


		var t1 = performance.now();
		console.log("Call to filter points took " + (t1 - t0) + " milliseconds.")

		// fire reducer/action to update points in view

		var t2 = performance.now();
		// console.log('points in view: ', Object.keys(aPointsWithinMapBounds).length)
		// console.log(aPointsWithinMapBounds)
		this.props.updatePointsInView(aPointsWithinMapBounds)

		var t3 = performance.now();
		console.log("Call to update points took " + (t3 - t2) + " milliseconds.")
	}
    render() {
		if (this.props.points.length > 0) {
			const { name, points, rawPoints } = this.props

			return (
				<div>
					<div className="sidebar-container">
						<TimelineSidebar />
					</div>
					<div className="elevation-profile-container">
						<ElevationProfile />
					</div>
					<div className="map-container">
						<div className="floating-map-button">
							<a className="ui button basic" onClick={this.props.goToStartPage}>close {name}</a>
						</div>
						<Map
							style={{
								height: "100%",
								width: "100%"
							}}
							bounds={rawPoints}
							maxZoom={18}
							onMoveend={this.handleMoveend.bind(this)}
							ref="map"
						>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<MarkerClusterGroup>
								{points.map(function(point, i){
									return <Marker key={i} position={[point.latitude, point.longitude]}></Marker>
								})}
							</MarkerClusterGroup>
						</Map>
					</div>
				</div>
			)
		} else {
			return (
				<div>0 points..</div>
			)
		}
    }
}

const pointsFromState = (state: Store.App): Array<[number, number]> => {
	let points: Array<[number, number]> = []

	if (state) {
		if (state.filepoints) {
			state.filepoints.map(oPoint => {
				points.push([oPoint.latitude, oPoint.longitude]);
			})
		}
	}
	return points
}

const nameFromState = (state: Store.App) => {
	return state && state.filename ? state.filename : '[error opening map]'
}

const rawPointsFromState = (data: Store.App) => {
	return data && data.filepoints ? data.filepoints : []
}

const mapStateToProps = (state: Store.App) => {
	return {
		filepoints: state.filepoints,
		rawPoints: pointsFromState(state),
		points: rawPointsFromState(state),
		name: nameFromState(state)
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	goToStartPage: () => dispatch(goToStartPage()),
	updatePointsInView: (aPointsInView: Array<GPXPoint>) => dispatch(updatePointsInView(aPointsInView))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapViewPage)