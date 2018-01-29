import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { fetchProjects } from '../../actions/index';

import ProjectFormComponent from './project_form_component';
import ProjectComponent from './project_component';

class ProjectsList extends Component {

	constructor(props){
		super(props);
		
		this.state = {
			todoFormComponent: '',
			projectsListContainer: '',
		}

		this.renderItem = this.renderItem.bind(this);
	}

	onSuccessStored(){
		this.hideTodoFormComponent();
	}

	componentWillMount(){
		this.props.fetchProjects();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.projects._id !== undefined) {
			this.props.fetchProjects();
		} else {
			this.setState({ projectsListContainer: <div> {nextProps.projects.map((item) => this.renderItem(item))} </div> })
		}
	}

	renderItem(item){
		return(<ProjectComponent key={item._id} id={item._id} sessionId={this.props.sessionId} item={item} onClickDelete={(id) => this.onClickDelete(id)}/>)
	}

	render(){

		if(this.props.projects == null){
			return(<div>Loading...</div>)
		}

		return(
			<div className="main-container">
				<header> <h1>Tracking Time App</h1> </header>
				<h2>Projects</h2>
				<ProjectFormComponent />
				{ this.state.projectsListContainer }
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		projects: state.projects
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);