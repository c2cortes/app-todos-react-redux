import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from '../actions/index';

import TodosList from './todos_list';

class TodosContainer extends Component {

	constructor(props){
		super(props);

		this.state = {
			sessionId: ''
		}
	}

	componentWillMount(){
		const sessionId = localStorage.getItem('sessionId');

		if(sessionId == "") {
			window.location.href = '/login';
		} else {
			this.setState({sessionId: sessionId});
			this.props.fetchTodos(sessionId);
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps != nextState){
			if(nextProps.storeTodo.data.status == 'success') {
				console.log('rerender todos')
				this.props.fetchTodos(this.state.sessionId);
			}
			return true;
		}
	}

	render(){
		return(
			<div className="main-container">
				<header> <h1>Crossover TODO</h1> </header>
				<TodosList status='notCompleted' label='warning' title='In Progress' sessionId={this.state.sessionId}/>
				<TodosList status='completed' label='success' title='Completed' sessionId={this.state.sessionId}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		storeTodo: state.storeTodo
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchTodos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);