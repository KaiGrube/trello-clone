import React from "react";
import Task from "./Task";
import ProjectOptions from "./ProjectOptions";
import Question from "./Modal/Question";
import Modal from "./Modal/Modal";
import './Project.scss';

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddTask: false,
            showProjectOptions: false,
            showQuestion: false,
            taskDescription: '',
            projectTitle: props.project.title,
        }
        this.projectTitleInputRef = React.createRef();
        this.addTaskRef = React.createRef();
        this.addTaskInputRef = React.createRef();
    }

    componentDidMount() {
        this.projectTitleInputRef.current.focus();
    }

    changeProjectTitle = (event) => {
        this.setState({projectTitle: event.target.value});
    }

    deleteProject = () => {
        this.setState({ showQuestion: true })
    }

    onDeleteProjectConfirmed = () => {
        this.setState({ showQuestion: false })
        console.log('Project|deleteProject(id): id=' + this.props.project.id)
        this.props.deleteProject(this.props.project.id);
    }

    onDeleteProjectCancelled = () => {
        this.setState({ showQuestion: false })
    }

    toggleShowAddTask = () => {
        this.setState({showAddTask: !this.state.showAddTask});
        const inputGroup = this.addTaskRef.current;

        if (this.state.showAddTask) {
            inputGroup.classList.add('display-none');
            inputGroup.classList.remove('input-group');
        } else {
            inputGroup.classList.remove('display-none');
            inputGroup.classList.add('input-group');
        }
        this.addTaskInputRef.current.focus();
    }

    changeTaskDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    addTaskOnEnter = (event) => {
        if (event.key === 'Enter' && event.target.value.length > 0) this.addTask();
    }

    addTask = () => {
        this.props.addTask(this.props.project.id, this.state.description)
        this.setState({description: ''})
    }

    blurOnEnter = (event) => {
        if (event.key === 'Enter') document.activeElement.blur()
    }

    render() {
        return (
            <div className='Project card p-1'>
                <div className="header m-1">
                    <input type="text"
                           value={this.state.projectTitle}
                           placeholder='Enter project name...'
                           className='project-title input-group-text'
                           ref={this.projectTitleInputRef}
                           onChange={this.changeProjectTitle}
                           onKeyUpCapture={this.blurOnEnter}
                    />

                    <ProjectOptions deleteProject={this.deleteProject}
                                    renameProject={ () => this.projectTitleInputRef.current.focus() }
                    />
                </div>

                <div className='tasks'>
                    {
                        this.props.project.tasks.map((task, taskId) =>
                        <Task key={task.id}
                              task={task}
                              deleteTask={() => this.props.deleteTask(task.id)}
                        />)
                    }
                </div>
                <div className='footer card p-1 m-1'>
                    <div onClick={this.toggleShowAddTask}
                         className='mx-1'>
                        + Add task
                    </div>
                    <div className='input-group display-none p-1 mr-4'
                         ref={this.addTaskRef}>
                        <input type="text"
                               className="form-control"
                               placeholder='Describe task...'
                               value={this.state.description}
                               onChange={this.changeTaskDescription}
                               onKeyUpCapture={this.addTaskOnEnter}
                               ref={this.addTaskInputRef}/>
                        <button className="btn btn-primary"
                                type="button"
                                onClick={this.addTask}>
                            +
                        </button>
                    </div>
                </div>

                {this.state.showQuestion
                    ?   <Modal>
                            <Question text='Do you really want do delete this project?'
                                      onYes={this.onDeleteProjectConfirmed}
                                      onNo={this.onDeleteProjectCancelled}/>
                        </Modal>
                    : null
                }
            </div>
        )
    }
}