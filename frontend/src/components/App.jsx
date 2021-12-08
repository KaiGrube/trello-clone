import React from 'react'
import axios from "axios";
import Project from "./Project";
import './App.scss';

const API_ENDPOINT = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

export default class App extends React.Component {

	constructor(props) {
		console.log(API_ENDPOINT)

		super(props);
		this.state = {
			projects: null,
			isFetching: true,
		};
	}

	componentDidMount() {
		this.fetchProjects();
	}

	async fetchProjects() {
		this.setState({isFetching: true})
		const response = await fetch(API_ENDPOINT + '/projects')
		const projects = await response.json();
		for (const project of projects) {
			project.tasks = await this.fetchTasks(project.id);
		}
		this.setState({ isFetching: false, projects: projects });
	}

	async fetchTasks(projectId) {
		const response = await fetch(API_ENDPOINT + '/tasks?projectId=' + projectId);
		return await response.json();
	}

	addProject = async () => {
		await axios({
			method: 'post',
			baseURL: API_ENDPOINT,
			url: '/projects',
			params: {
				title: '',
			},
		});
		this.fetchProjects();
	}

	deleteProject = async (id) => {
		await axios({
			method: 'delete',
			baseURL: API_ENDPOINT,
			url: '/project',
			params: {
				id: id,
			},
		});
		this.fetchProjects();
	}

	addTask = async (projectId, description) => {
		await axios({
			method: 'post',
			baseURL: API_ENDPOINT,
			url: '/tasks',
			params: {
				projectId: projectId,
				description: description
			},
		});
		this.fetchProjects();
	}

	deleteTask = async (id) => {
		await axios({
			method: 'delete',
			baseURL: API_ENDPOINT,
			url: '/task',
			params: {
				id: id
			},
		});
		this.fetchProjects();
	}

	render() {
		return (
			<div className='App'>
				<input type='button'
							 value='Add Project'
							 className='btn btn-primary'
							 onClick={this.addProject}/>
				<div className='projects'>
					{this.state.isFetching
						? <div>Loading</div>
						: <div className='projects'>
							{this.state.projects.map((project) =>
								<Project key={project.id}
												 project={project}
												 deleteProject={this.deleteProject}
												 addTask={this.addTask}
												 deleteTask={this.deleteTask}
								/>)}
							</div>
					}
				</div>
			</div>
		)
	}
}