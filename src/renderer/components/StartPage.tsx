import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { loadFile, startLoadingFile } from '../redux/actions'
import { remote } from 'electron'

interface IMyComponentProps {
	bFileLoading: boolean
	loadFile: any,
	startLoadingFile: any
}

interface IMyComponentState {
}
class StartPage extends React.Component<IMyComponentProps, {}> {

	constructor(props: IMyComponentProps) {
		super(props);
	}
	
	selectFile = () => {
		remote.dialog.showOpenDialog({ 
			filters: [
				{ name: 'GPX files', extensions: ['gpx'] },
			],
			properties: [ 'openFile' ] }, (filename: string[]) => {
				if (filename && filename.length === 1) {
					this.props.startLoadingFile()
					this.props.loadFile(filename[0])
				}
			}
		)	
	}
    render() {
		return (
			<div className="ui container home-container">
				<div className="ui segment">
					<p>open a GPX file to begin..</p>
					<a className="ui button" onClick={this.selectFile.bind(this)}>select a GPX file..</a>
					file loading: {String(this.props.bFileLoading)}
				</div> 
			</div> 
		)
    }
}


const mapStateToProps = (state: Store.App) => ({
	bFileLoading: state.bFileLoading
})

const mapDispatchToProps = (dispatch: any) => ({
	loadFile: (filePath: string) => dispatch(loadFile(filePath)),
	startLoadingFile: () => dispatch(startLoadingFile())
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
