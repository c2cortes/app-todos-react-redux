import React, { Component } from 'react';
import  md5 from 'md5';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authAction } from '../../actions/index';

class LoginView extends Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			password: '',
			sessionId: '',
			message: ''
		}

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.authState.data.status == 'success'){
			localStorage.setItem('sessionId', nextProps.authState.data.sessionId)
			window.location.href = '/todos';
		} else {
			this.showAlert(nextProps.authState.data.error)
		}
	}

	showAlert(message){
		let messageContent = <div className="alert alert-danger" role="alert">{message}</div>;
		this.setState({ message: messageContent });
	}

	onFormSubmit(event){
		event.preventDefault();

		if(this.state.username == ""){
			this.showAlert('Username is required');
		} else if(this.state.password == ""){
			this.showAlert('Password is required');
		} else {
			this.props.authAction(this.state.username, md5(this.state.password));
		}
	}

	render(){
		return(
			<div className="cont-login-form">
				<h4>Login</h4>
				<form onSubmit={this.onFormSubmit}>
					<div className="form-group">
						<label>Username:</label>
						<input
							placeholder="Username"
							className="form-control"
							value={this.state.username}
							onChange={(event) => {this.setState({ username: event.target.value })}}
						/>
					</div>

					<div className="form-group">
						<label>Password:</label>
						<input
							type="password"
							placeholder="Password"
							className="form-control"
							value={this.state.password}
							onChange={(event) => {this.setState({ password: event.target.value })}}
						/>
					</div>

					<span className="input-group-btn">
						<button type="submit" className="btn btn-secondary">Submit</button>
					</span>
				</form>

				<div>
					{this.state.message}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		authState: state.authState
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ authAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);