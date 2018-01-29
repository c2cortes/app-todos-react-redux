import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginView from './auth/login_view';

class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			contentLogin: <LoginView/>,
			contentSection: '',
			sessionId: 'oxaX05ennwTdRrUpa9ZChGEeZ9WSkHps'
		}
	}

	render(){
		return(
			<div>
				<div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		authState: state.authState
	}
}

export default connect(mapStateToProps)(App)