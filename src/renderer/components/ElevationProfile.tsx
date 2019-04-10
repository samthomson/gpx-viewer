import * as React from 'react'
import { connect } from 'react-redux'
// @ts-ignore
import { Line as LineChart } from  'react-chartjs'

import { Store } from '../redux/store'
import { GPXData, GPXPoint } from '../../declarations';

import { proportionPoints } from './../lib/helper'

interface IMyComponentProps {
	points: Array<GPXPoint>
}

export class ElevationProfile extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
		if (this.props.points.length > 0) {
			const { points } = this.props

			const dataPoints = this.props.points.map(oP => oP.elevation)
			const dataLabels = this.props.points.map(oP => ''/*oP.time*/)

			let chartOptions = {
				responsive: true,
				maintainAspectRatio: false
			}

			var chartData = {
				labels: dataLabels,
				datasets: [
					{
						label: "Elevation of points on the map",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: dataPoints,
					}
				]
			};

			return (
				<div>
					<LineChart data={chartData} options={chartOptions} width="100%" height="180"/>
				</div>
			)
		} else {
			return (
				<div>no points..</div>
			)
		}
    }
}

const mapStateToProps = (state: Store.App): IMyComponentProps => {
	return {
		points: proportionPoints(state.aPointsInView, 100)
	};
};


export default connect(
	mapStateToProps,
	null
)(ElevationProfile)