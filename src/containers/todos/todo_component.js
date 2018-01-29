import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTodo } from '../../actions/index';

class TodoComponent extends Component {

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

		this.clickStatusButton = this.clickStatusButton.bind(this);
	}

	clickStatusButton(action){
		if(action) {
			this.addSecondsToCurrentTime(this.state.elapsedSeconds);
			this.setCurrentButton(true);
		} else {
			clearInterval(this.interval);
			this.setCurrentButton(false);
			this.props.updateTodo(this.props.sessionId, { _id: this.props.item._id, elapsedSeconds: this.state.elapsedSeconds, onGoing: false });
		}
	}

	setCurrentButton(onGoing){
		
		let _button = <button type="button"className="btn btn-success btn-sm"onClick={() => this.clickStatusButton(true)}>Play</button>;

		if(onGoing){
			_button = <button type="button"className="btn btn-danger btn-sm"onClick={() => this.clickStatusButton(false)} > Stop </button>; 
		}

		this.setState({button: _button});
	}

	setElapsedTodoTime(seconds){

		const d = new Date("January 01, 1970 00:00:00");
		
		d.setSeconds(d.getSeconds() + seconds);

		this.setState({
			hours: d.getHours(),
			minutes: d.getMinutes(),
			seconds: d.getSeconds(),
			elapsedSeconds: seconds
		});
	}

	addSecondsToCurrentTime(seconds){

		let elapsedSeconds = seconds;

		this.interval = setInterval(() => {
			elapsedSeconds++;
			this.setElapsedTodoTime(elapsedSeconds);
		}, 1000);
	}

	componentDidMount(){
		this.setCurrentButton(this.props.item.onGoing);
		this.setElapsedTodoTime(this.props.item.elapsedSeconds);

		if(this.props.item.onGoing) this.addSecondsToCurrentTime(this.props.item.elapsedSeconds);
	}

	render(){

		return(
			<div
				className="card border-dark mb-3"
				id={this.props.id}
			>

			  <div className="card-header">
			  	<div>Time: {this.state.hours +':'+ this.state.minutes +':'+ this.state.seconds}</div>
			  	<div className="trash-button">
			  		{this.state.button}
			    </div>
			  </div>
			  <div className="card-body text-dark">
			    <p className="card-text">{this.props.item.name}</p>
			  </div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ updateTodo }, dispatch);
}

export default connect(null, mapDispatchToProps)(TodoComponent);