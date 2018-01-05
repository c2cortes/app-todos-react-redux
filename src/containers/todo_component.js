import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteTodo } from '../actions/index';

class TodoComponent extends Component {

	constructor(props){
		super(props);

	}

	render(){
		return(
			<div
				className="card border-dark mb-3"
				id={this.props.id}
			>

			  <div className="card-header">
			  	<div>{this.props.item.title}</div>
			  	<div className="trash-button">
				  	<button 
				  		type="button" 
				  		className="btn btn-danger btn-sm"
				  		onClick={() => this.props.deleteTodo(this.props.sessionId, {'id': this.props.id})}
				  	>
				  		Trash
				  	</button>
			    </div>
			  </div>
			  <div className="card-body text-dark">
			    <p className="card-text">{this.props.item.description}</p>
			    <h6 className="card-title">Author: {this.props.item.author.username}</h6>
			  </div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ deleteTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoComponent);