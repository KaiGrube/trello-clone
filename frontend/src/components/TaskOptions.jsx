import React from "react";

export default class TaskOptions extends React.Component {

    render() {
        return (
            <div className='TaskOptions'>
                <div className='item delete'
                     onClick={this.props.deleteTask}>
                    <i className="fas fa-trash-alt"/>
                </div>
            </div>
        )
    }
}