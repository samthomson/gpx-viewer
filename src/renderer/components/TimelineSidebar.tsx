import * as React from 'react'
import { connect } from 'react-redux'

import { Store } from '../redux/store'
import { GPXData, GPXPoint } from '../../declarations';


interface IMyComponentProps {
	points: GPXPoint[]
}

export class TimelineSidebar extends React.Component<IMyComponentProps, {}> {
    constructor(props: IMyComponentProps) {
		super(props);
	}
    render() {
		if (this.props.points.length > 0) {
			const { points } = this.props

			return (
				<div>timeline{points.length}</div>
			)
		} else {
			return (
				<div>no points yet..</div>
			)
		}
    }
}

const mapStateToProps = (state: Store.App): IMyComponentProps => {
	return {
		points: state.aPointsInView
	};
};


export default connect(
	mapStateToProps,
	null
)(TimelineSidebar)