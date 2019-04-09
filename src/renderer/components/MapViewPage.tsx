import * as React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import {  Map, TileLayer, Marker, Popup } from 'react-leaflet'
// @ts-ignore
import * as L from 'leaflet'
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster'

// @ts-ignore
import * as Rainbow from 'rainbowvis.js'

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

		if (this.props.aPointsInView.length > 0 || true) {
			const { name, aPointsInView } = this.props


			var rainbow = new Rainbow(); 
			rainbow.setNumberRange(1, aPointsInView.length);
			rainbow.setSpectrum('yellow', 'red');

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
							center={[0,0]}
							zoom={2}
							maxZoom={18}
							onMoveend={this.handleMoveend.bind(this)}
							ref="map"
						>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							{aPointsInView.map(function(point, i) {

								const myCustomColour = '#' + rainbow.colourAt(i)

								const markerHtmlStyles = `
									background-color: ${myCustomColour};
									width: 3rem;
									height: 3rem;
									display: block;
									left: -1.5rem;
									top: -1.5rem;
									position: relative;
									border-radius: 3rem 3rem 0;
									transform: rotate(45deg);
									border: 1px solid #FFFFFF`

								var myIcon = L.divIcon({
									className: "my-custom-pin",
									iconAnchor: [0, 24],
									labelAnchor: [-6, 0],
									popupAnchor: [0, -36],
									html: `<span style="${markerHtmlStyles}" />`
								})

								return <Marker
									icon={myIcon}
									key={i}
									position={[point[0], point[1]]}
								></Marker>
							})}
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

			points = proportionPoints(points, iIdealMax)
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