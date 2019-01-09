import * as React from 'react'
import * as Redux from 'react-redux'
import * as actions from '../redux/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Store } from '../redux/store'
import { goToMapPage } from '../redux/actions'
import PropTypes, { string } from 'prop-types'
import { remote } from 'electron'

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
	
	selectFile () {
		remote.dialog.showOpenDialog({ 
			properties: [ 'openFile' ] }, filename => {
				this.props.goToMapPage(filename[0])
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
