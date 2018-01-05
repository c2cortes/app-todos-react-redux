import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { storeTodo } from '../actions/index';
 
class TodoFormComponent extends Component {

	constructor(props){
		super(props);

		this.state = {
			title: '',
			description: ''
		}
	}

	showAlert(message){
		let messageContent = <div className="alert alert-danger" role="alert">{message}</div>;
		this.setState({ message: messageContent });
	}

	onFormSubmit(event){
		event.preventDefault();

		if(this.state.title == ""){
			this.showAlert('Title is required');
		} else if(this.state.description == ""){
			this.showAlert('Description is required');
		} else {
			
			const params = {
			    title: this.state.title,
			    description: this.state.description,
			    status: 'notCompleted'
			}

			this.props.storeTodo(this.props.sessionId, params);
			this.props.onSuccessStored();
		}
	}

	render(){
		return(
			<form onSubmit={this.onFormSubmit}>
				<div className="card border-dark mb-3">
				  <div className="card-header">
				  	
				  		<input
							placeholder="Title"
							className="form-control"
							value={this.state.title}
							onChange={(event) => {this.setState({ title: event.target.value })}}
						/>
				  	
				  </div>
				  <div className="card-body text-dark">

				    <p className="card-text">
				    	<textarea 
				    		className="form-control" 
				    		rows="3" 
				    		placeholder="Description"
				    		value={this.state.description}
				    		onChange={(event) => {this.setState({ description: event.target.value })}}
				    	></textarea>
				    </p>
				    
				    <button onClick={() => this.props.onCancel()} type="button" className="btn btn-danger">Cancel</button>
					<button onClick={(event) => this.onFormSubmit(event)} type="submit" className="btn btn-primary">Save</button>
					
				  </div>
				</div>

				<div>
					{this.state.message}
				</div>
			</form>
		)

	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ storeTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoFormComponent)