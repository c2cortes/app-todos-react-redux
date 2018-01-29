import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeTodo, fetchTodos } from '../../actions/index';
 
class TodoFormComponent extends Component {

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
			const params = {name: this.state.name, project_id: this.props.project_id }
			this.props.storeTodo(params);
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
								placeholder="What are you working on?"
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
		currentProject: state.currentProject
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ storeTodo, fetchTodos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoFormComponent)