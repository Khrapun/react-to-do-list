import React, { Component } from 'react';

import './add-item.css'

export default class AddItem extends Component  {

    state = {
        newTodo: ''
    }
    
    onLabelChange = (e) => {
        this.setState({
            newTodo: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.newTodo)
        this.setState({
            newTodo: ''
        });
    }

    render () {
        return  (
            <form className="add-item-panel d-flex justify-content-end"
                onSubmit={ this.onSubmit }>
              <input type="text" className="form-control input" 
              onChange={this.onLabelChange} 
              placeholder="What needs to be done"
              value={this.state.newTodo}/>
              <button type="submit"
                  className="btn btn-primary btn-lg"
                >
                <i className="fa fa-plus" />
              </button>
            </form>
        )
    }
};
