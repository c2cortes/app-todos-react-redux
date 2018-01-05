import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TodoFormComponent from './todo_form_component';
import TodoComponent from './todo_component';



class TodosList extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			todoFormComponent: ''
		}

		this.renderItem = this.renderItem.bind(this);
		this.hideTodoFormComponent = this.hideTodoFormComponent.bind(this)
	}

	onSuccessStored(){
		this.hideTodoFormComponent();
		//this.props.onSuccessStored();
	}

	renderTodoFormComponent(){
		this.setState({ todoFormComponent: <TodoFormComponent onCancel={() => this.hideTodoFormComponent()} onSuccessStored={() => this.onSuccessStored()} sessionId={this.props.sessionId} /> });
	}

	hideTodoFormComponent(){
		this.setState({ todoFormComponent: '' });
	}

	newItemButton(){
		if(this.props.status == 'notCompleted'){
			return <button onClick={() => this.renderTodoFormComponent()} type="button" className="btn btn-secondary">Add new item</button>
		}
	}

	renderItem(item){
		let labelClass = "card-body text-"+this.props.label;
		let labelStatusClass = "badge badge-"+this.props.label;

		if(item.status == this.props.status){
			return(<TodoComponent key={item._id} id={item._id} sessionId={this.props.sessionId} item={item} onClickDelete={(id) => this.onClickDelete(id)}/>)
		}
	}

	render(){

		if(this.props.todos == null){
			return(<div>Loading...</div>)
		}

		return(
			<div className="cont-todos-items">
				<h3>{this.props.title}</h3>
				<div >
					{ this.props.todos.map(this.renderItem) }
				</div>

				<div>
					{ this.state.todoFormComponent }
				</div>

				<div className='cont-new-item-button'>
					{ this.newItemButton() }
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		todos: state.todos,
		storeTodo: state.storeTodo
	}
}

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators({ fetchTodos }, dispatch);
// }

export default connect(mapStateToProps)(TodosList);