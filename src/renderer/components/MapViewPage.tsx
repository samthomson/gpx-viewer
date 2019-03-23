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

import { proportionPoints } from './../lib/helper'

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
	name: string,
	aPointsInView: [number, number][]
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
		this.props.updatePointsInView(oBounds)		
	}

    render() {
		if (this.props.aPointsInView.length > 0) {
			const { name, aPointsInView } = this.props

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
							center={[aPointsInView[0][0], aPointsInView[0][1]]}
							zoom={9}
							maxZoom={18}
							onMoveend={this.handleMoveend.bind(this)}
							ref="map"
						>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<MarkerClusterGroup>
								{aPointsInView.map(function(point, i){
									return <Marker key={i} position={[point[0], point[1]]}></Marker>
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
		let { aPointsInView } = state

		if (aPointsInView) {
			aPointsInView.map(oPoint => {
				points.push([oPoint.latitude, oPoint.longitude]);
			})

			const iPointCount: number = aPointsInView.length
			const iIdealMax: number = 300

			aPointsInView = proportionPoints(aPointsInView, iIdealMax)
		}
	}

	return points
}

const nameFromState = (state: Store.App) => {
	return state && state.filename ? state.filename : '[error opening map]'
}

const mapStateToProps = (state: Store.App) => {
	return {
		aPointsInView:  pointsFromState(state),
		name: nameFromState(state)
	};
};

const mapDispatchToProps = (dispatch: any) => ({
	goToStartPage: () => dispatch(goToStartPage()),
	updatePointsInView: (oBounds: any) => dispatch(updatePointsInView(oBounds))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapViewPage)