import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTodos } from '../../actions/index';

import TodoComponent from './todo_component';
import TodoFormComponent from './todo_form_component';

class TodosList extends Component {

	constructor(props){
		super(props);

		this.state = {
			sessionId: '',
			todosListContainer: ''
		}
	}

	componentWillMount(){
		if(localStorage.getItem('googleId') == null) window.location.href = '/login';
		else this.props.fetchTodos(this.props.match.params.project_id);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.todos._id !== undefined) {
			this.props.fetchTodos(this.props.match.params.project_id);
		} else {
			this.setState({ todosListContainer: <div> {nextProps.todos.map((item) => this.renderItem(item))} </div> })
		}
	}

	renderItem(item){
		return(<TodoComponent key={item._id} id={item._id} item={item} onClickDelete={(id) => this.onClickDelete(id)}/>)
	}

	render(){
	
		if(this.props.todos == null){
			return(<div>Loading...</div>)
		}

		return(
			<div className="main-container">
				<a href="/login/0"> {'Logout ' + localStorage.getItem('userName')} </a>
				<header> <h1>Tracking Time App</h1> </header>
				<h2>Tasks</h2>
				<Link to={'/projects'}>Go to projects</Link>
				<TodoFormComponent project_id={this.props.match.params.project_id}/>
				{ this.state.todosListContainer }
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		storeTodo: state.storeTodo,
		todos: state.todos
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchTodos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosList);