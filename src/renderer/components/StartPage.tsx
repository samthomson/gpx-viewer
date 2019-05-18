import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { setFileLoading, startLoadingFile } from '../redux/actions'
import { remote } from 'electron'

interface IMyComponentProps {
	bFileLoading: boolean
	loadFile: any
	startLoadingFile: (sFilePath: string) => {}
	setFileLoading: (bFileLoading: boolean) => {}
}

interface IMyComponentState {}
class StartPage extends React.Component<IMyComponentProps, {}> {
	constructor(props: IMyComponentProps) {
		super(props)
	}

	selectFile = async () => {
		const filename = await remote.dialog.showOpenDialog({
			filters: [{ name: 'GPX files', extensions: ['gpx'] }],
			properties: ['openFile'],
		})

		if (filename && filename.length === 1) {
			this.props.setFileLoading(true)
			this.props.startLoadingFile(filename[0])
		}
	}
	render() {
		return (
			<div className="ui container home-container">
				<div className="ui segment">
					{!this.props.bFileLoading && (
						<div>
							<p>open a GPX file to begin..</p>
							<a
								className="ui button"
								onClick={this.selectFile.bind(this)}
							>
								select a GPX file..
							</a>
						</div>
					)}
					{this.props.bFileLoading && <span>file loading..</span>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: Store.App) => ({
	bFileLoading: state.bFileLoading,
})

const mapDispatchToProps = (dispatch: any) => ({
	startLoadingFile: (filePath: string) =>
		dispatch(startLoadingFile(filePath)),
	setFileLoading: (bFileLoading: boolean) =>
		dispatch(setFileLoading(bFileLoading)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(StartPage)
