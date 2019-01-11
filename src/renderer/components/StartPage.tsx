import * as React from 'react'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { loadFile } from '../redux/actions'
import { remote } from 'electron'
import { GPXData } from '../../declarations';

interface IMyComponentProps {
	loadFile: any,
	fileData: GPXData
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
				this.props.loadFile(filename[0])
			}
		)	
	}
    render() {
       return (
        <div className="ui container home-container">
			<div className="ui segment">
            	<p>open a GPX file to begin..</p>
				<a className="ui button" onClick={this.selectFile.bind(this)}>select a GPX file..</a>
			</div> 
        </div> 
       )
    }
}


const mapStateToProps = (state: Store.App) => ({
	fileData: state.fileData
})

const mapDispatchToProps = (dispatch: any) => ({
	loadFile: (filePath: string) => dispatch(loadFile(filePath))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
