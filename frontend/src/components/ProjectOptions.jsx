import React from "react";
import './ProjectOptions.scss'

export default class ProjectOptions extends React.Component {

    constructor(props) {
        super(props);
        this.menuRef = React.createRef();
    }

    toggleProjectOptions = () => {
        const menuGroup = this.menuRef.current;
        const display = window.getComputedStyle(menuGroup)
                              .getPropertyValue('display');

        if (display === 'none') this.showProjectOptions();
        else this.hideProjectOptions();
    }

    showProjectOptions = () => {
        const menuGroup = this.menuRef.current;
        menuGroup.style.display = 'flex';
        document.body.addEventListener('click', this.hideProjectOptions);
    }

    hideProjectOptions = (event) => {
        const menuGroup = this.menuRef.current;
        menuGroup.style.display = 'none';
        document.body.removeEventListener('click', this.hideProjectOptions);
    }

    renameProject = () => {
        this.hideProjectOptions();
        this.props.renameProject();
    }

    deleteProject = () => {
        this.hideProjectOptions();
        this.props.deleteProject();
    }

    render() {
        return (
            <div className='ProjectOptions'>
                <div id='toggleButton'
                     className='btn btn-primary'
                     onClick={this.toggleProjectOptions}>
                    <i className="fas fa-bars"/>
                </div>
                <div id='menu' className='card p-2' ref={this.menuRef}>
                    <input type='button'
                           value='Rename Project'
                           className='btn btn-primary'
                           onClick={this.renameProject}>
                    </input>
                    <input type='button'
                           value='DeleteProject'
                           className='btn btn-primary'
                           onClick={() => this.deleteProject()}>
                    </input>
                </div>
            </div>
        )
    }
}