import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProjectComponent extends Component {

	constructor(props){
		super(props);

		let interval = null;

		this.state = {
			button: '',
			hours: '00',
			minutes: '00',
			seconds: '00',
			elapsedSeconds: 0
		}
	}

	clickStatusButton(){
		window.location.href = '/todos/'+this.props.item._id;
	}

	setCurrentButton(onGoing){
		let _button = <button type="button"className="btn btn-success btn-sm"onClick={() => this.clickStatusButton(true)}>Show tasks</button>;
		this.setState({button: _button});
	}

	componentDidMount(){
		this.setCurrentButton(false);
	}

	render(){

		return(
			<div
				className="card border-dark mb-3"
				id={this.props.id}
			>

			  <div className="card-header">
			  	<div>{this.props.item.name}</div>
			  	<div className="trash-button">
			  		{this.state.button}
			    </div>
			  </div>
			  <div className="card-body text-dark">
			    {this.state.tasks}
			  </div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		storeTodo: state.storeTodo,
		todos: state.todos,
		currentProject: state.currentProject
	}
}

export default connect(mapStateToProps)(ProjectComponent);