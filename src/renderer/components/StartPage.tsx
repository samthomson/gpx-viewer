import * as React from 'react'
import * as Redux from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { loadFile } from '../redux/actions'
import PropTypes, { string } from 'prop-types'
import { remote } from 'electron'

interface IMyComponentProps {
	loadFile: any,
	filePath: string
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
        <div>
            <h1>Start page</h1>
            <p>Load a file ({this.props.filePath}) to begin..</p>
			<button onClick={this.selectFile.bind(this)}>select a GPX file..</button>
        </div> 
       )
    }
}


const mapStateToProps = (state: Store.App) => ({
	filePath: state.filePath
})

const mapDispatchToProps = (dispatch: any) => ({
	loadFile: (filePath: string) => dispatch(loadFile(filePath))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
