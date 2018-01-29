import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeProject, fetchProjects } from '../../actions/index';
 
class ProjectFormComponent extends Component {

	constructor(props){
		super(props);

		this.state = {
			name: ''
		}

		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	showAlert(message){
		let messageContent = <div className="alert alert-danger" role="alert">{message}</div>;
		this.setState({ message: messageContent });
	}

	onFormSubmit(event){
		event.preventDefault();

		if(this.state.name == ''){
			this.showAlert('Name is required');
		} else {
			const params = {name: this.state.name };
			this.props.storeProject(params);
			this.setState({ message: '', name: '' });
		}
	}

	render(){
		return(
			<form onSubmit={this.onFormSubmit}>
				<div className="card border-dark mb-3">
				  <div className="card-header">
				  		<div className="content-todo-form-input">
					  		<input
								placeholder="Enter the name of the new project"
								className="form-control"
								value={this.state.name}
								onChange={(event) => {this.setState({ name: event.target.value })}}
							/>

							<button onClick={(event) => this.onFormSubmit(event)} type="submit" className="btn btn-primary">Save</button>
						</div>

						<div>
							{this.state.message}
						</div>
				  </div>
				</div>
			</form>
		)

	}
}

function mapStateToProps(state){
	return {
		storeProjectResponse: state.storeProject
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ storeProject, fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormComponent)