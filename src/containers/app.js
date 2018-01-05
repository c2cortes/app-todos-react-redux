import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginView from './login_view';
import TodosContainer from './todos_container';

class App extends Component{

	constructor(props){
		super(props);

		this.state = {
			contentLogin: <LoginView/>,
			contentSection: '',
			sessionId: 'oxaX05ennwTdRrUpa9ZChGEeZ9WSkHps'
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps != nextState){
			console.log('changed')
			if(nextProps.authState.data.status == 'success'){
				this.setState({contentSection: <TodosContainer sessionId={this.state.sessionId}/>});
			}

			return true;
		}
	}

	render(){
		return(
			<div>
				<div>
					<TodosContainer sessionId={this.state.sessionId}/>
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