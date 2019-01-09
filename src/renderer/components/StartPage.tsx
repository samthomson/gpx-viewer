import * as React from 'react'
import * as Redux from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { goToMapPage } from '../redux/actions'
import PropTypes, { string } from 'prop-types'
import { remote } from 'electron'
import fs from 'fs'

interface IMyComponentProps {
	goToMapPage: any,
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
			properties: [ 'openFile' ] }, async (filename: string[]) => {

				var sFileData = fs.readFileSync(filename[0], 'utf8');

				console.log('file data')
				console.log(sFileData)

				this.props.goToMapPage(sFileData)
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
	goToMapPage: (filePath: string) => dispatch(goToMapPage(filePath))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPage)
