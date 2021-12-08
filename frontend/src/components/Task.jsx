import React from "react";
import TaskOptions from "./TaskOptions";
import './Task.scss'

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
            description: this.props.task.description,
        };
        this.inputElementRef = React.createRef();
    }

    changeDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    blurOnEnter = (event) => {
        if (event.key === 'Enter') document.activeElement.blur()
    }

    render() {
        return (
            <div className='Task card p-2 m-1'>
                <input value={this.state.description}
                       ref={this.inputElementRef}
                       onChange={this.changeDescription}
                       onKeyUpCapture={this.blurOnEnter}/>
                <TaskOptions deleteTask={this.props.deleteTask}/>
            </div>
        )
    }
}