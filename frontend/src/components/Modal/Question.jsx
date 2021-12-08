import React from "react";
import './Question.scss';

export default class Question extends React.Component {

    render() {
        return (
            <div className='Question'>
                <div className='window card p-1 m-1'>
                    <main className='p-1 m-1'>
                        {this.props.text}
                    </main>
                    <footer>
                        <input type="button"
                              value='yes'
                              onClick={this.props.onYes}
                              className='btn btn-danger mx-2'
                        />
                        <input type="button"
                               value='no'
                               onClick={this.props.onNo}
                               className='btn btn-primary'
                        />
                    </footer>
                </div>
            </div>
        )
    }
}